import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { UserRepo } from '../service/userRepo';
import { CategoryRepo } from '../service/categoryRepo';
import { FeedRepo } from '../service/feedRepo';

import { AppBaseComponent } from './app.base';
import { CategoryDto } from '../model/categoryDto';
import { FeedDto } from '../model/feedDto';
import { FeedMapper } from '../model/feedMapper';

@Component({
    selector: 'app-home',
    templateUrl: '../template/app.home.html'
})

export class AppHomeComponent extends AppBaseComponent implements OnInit, OnDestroy {
    public categories: CategoryDto[];
    public selectedCategory: CategoryDto;
    public feeds: FeedDto[];
    public selectedFeed: FeedDto;
    public rss: FeedMapper[];
    public menuY: string;
    public goUpY: string;

    private socket: WebSocket = null;
    private sub: any;

    constructor(securityService: SecurityService, uiService: UiService, router: Router, private categoryRepo: CategoryRepo, private feedRepo: FeedRepo, private route: ActivatedRoute, private location: Location) {
        super(securityService, uiService, router);

        if (this.securityService.user != null) {
            this.getCategories();
        }
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['categoryId'] !== undefined && params['categoryId'] != null) {
                this.selectedCategory = new CategoryDto();
                this.selectedCategory._id = params['categoryId'] === '0' ? '' : params['categoryId'];
                this.onCategorySelect(this.selectedCategory);
            }

            if (params['feedId'] !== undefined && params['feedId'] != null) {
                this.selectedFeed = new FeedDto();
                this.selectedFeed._id = params['feedId'];
                this.onFeedSelect(this.selectedFeed);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    onDestroy(event) {
        this.socket = null;
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.menuY = window.pageYOffset + 'px';
        this.goUpY = window.pageYOffset + window.innerHeight - 40 + 'px';
    }

    public goUp(): void {
        window.scrollTo(0, 0);
    }

    public isGoUpVisible(): boolean {
        return window.pageYOffset > 0;
    }

    public getCategoryFontWeight(category: CategoryDto): string {
        if (this.selectedCategory !== undefined && category._id === this.selectedCategory._id) {
            return 'bold';
        } else {
            return '';
        }
    }

    public getFeedFontWeight(feed: FeedDto): string {
        if (this.selectedFeed !== undefined && feed._id === this.selectedFeed._id) {
            return 'bold';
        } else {
            return '';
        }
    }

    public onCategorySelect(category: CategoryDto): void {
        this.uiService.loading();

        this.selectedCategory = category;

        this.feedRepo.getAllByCategory(category).subscribe(res => {
            this.onCategorySelected(res);
            this.location.go('home/' + (this.selectedCategory._id === '' ? '0' : this.selectedCategory._id));
        });
    }

    public onFeedSelect(feed: FeedDto): void {
        this.uiService.loading();

        this.selectedFeed = feed;

        this.feedRepo.getRss(feed).subscribe(res => {
            this.onFeedSelected(res);
            this.location.go('home/' + (this.selectedCategory._id === '' ? '0' : this.selectedCategory._id) + '/' + this.selectedFeed._id);
        });
    }

    private onRefresh(): void {
        const that = this;

        if (this.socket != null) {
            this.socket.close();
            this.socket = null;
        }

        const host = location.origin.replace(/^http/, 'ws');
        this.socket = new WebSocket(host);

        this.socket.addEventListener('open', function (event) {
            that.socket.send(JSON.stringify({ operation: 'start', id: that.selectedFeed._id, interval: 30000 }));
        });

        this.socket.onmessage = function (message) {
            const rss: FeedMapper[] = JSON.parse(message.data) as FeedMapper[];

            if (!(rss[0].title === that.rss[0].title && rss[0].pubDate === that.rss[0].pubDate)) {
                that.rss = rss;
                that.goUp();
            }
        };
    }

    private getCategories(): void {
        this.uiService.loading();

        this.categoryRepo.getAll().subscribe(res => {
            this.onGetCategories(res);
        });
    }

    private onGetCategories(result): void {
        this.uiService.loaded();

        this.categories = result.categories;

        const others = new CategoryDto();
        others._id = '';
        others.name = 'Uncategorized';

        if (this.categories == null) {
            this.categories = [];
        }

        this.categories.push(others);
    }

    private onCategorySelected(result): void {
        this.uiService.loaded();

        this.feeds = result.feeds;
    }

    private onFeedSelected(result): void {
        this.rss = result.feedMapper;
        this.uiService.loaded();

        this.onRefresh();
    }
}
