import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { FeedRepo } from '../service/feedRepo';
import { CategoryRepo } from '../service/categoryRepo';

import { AppBaseComponent } from './app.base';
import { FeedDto } from '../model/feedDto';
import { FeedMapper } from '../model/feedMapper';
import { CategoryDto } from '../model/categoryDto';

@Component({
    selector: 'app-settings-feeds',
    templateUrl: '../template/app.settingsFeeds.html'
})

export class AppSettingsFeedsComponent extends AppBaseComponent {
    public feed: FeedDto = new FeedDto();
    public feeds: FeedDto[];
    private categories: CategoryDto[];

    constructor(securityService: SecurityService, uiService: UiService, router: Router, private feedRepo: FeedRepo, private categoryRepo: CategoryRepo) {
        super(securityService, uiService, router);

        this.getCategories();
    }

    public handleCategoriesUpdated(event: any): void {
        const theFeed = (event.feed === undefined || event.feed == null) ? this.feed : event.feed;

        theFeed.categories = [];

        event.selectedCategories.forEach(function (item) {
            theFeed.categories.push(item._id);
        });
    }

    public onClear(): void {
        this.feed.url = '';
        this.feed.name = '';
        this.feed.feedMapper = null;
    }

    public onParse(): void {
        this.uiService.loading();

        this.feedRepo.getRssStructure(this.feed).subscribe(res => {
            this.uiService.loaded();

            const feedMapper = res.feedMapper as FeedMapper;

            this.feed.feedMapper = new FeedMapper();
            this.feed.feedMapper.title = feedMapper.title !== undefined ? 'title' : '';
            this.feed.feedMapper.description = feedMapper.description !== undefined ? 'description' : '';
            this.feed.feedMapper.link = feedMapper.link !== undefined ? 'link' : '';
            this.feed.feedMapper.pubDate = feedMapper.pubDate !== undefined ? 'pubDate' : '';
            this.feed.feedMapper.author = feedMapper.author !== undefined ? 'author' : '';
        });
    }

    public onAdd(): void {
        this.uiService.loading();

        this.feed.userId = this.securityService.user._id;

        this.feedRepo.add(this.feed).subscribe(res => {
            this.onAddFeed(res);
        });
    }

    public onEdit(feed: FeedDto): void {
        feed.initName = feed.name;
        feed.initMapper = Object.assign({}, feed.feedMapper);
        feed.initCategories = feed.categories.slice();

        feed.isEditMode = true;
    }

    public onUpdate(feed: FeedDto): void {
        this.uiService.loading();

        this.feedRepo.update(feed).subscribe(res => {
            this.uiService.loaded();

            feed.initName = feed.name;
            feed.initMapper = feed.feedMapper;
            feed.initCategories = feed.categories;
            feed.isEditMode = false;
        });
    }

    public onCancel(feed: FeedDto): void {
        feed.name = feed.initName;
        feed.feedMapper = feed.initMapper;
        feed.categories = feed.initCategories;

        feed.isEditMode = false;
    }

    public onDelete(feed: FeedDto): void {
        feed.isDeleteMode = true;
    }

    public onConfirmDelete(feed: FeedDto): void {
        this.uiService.loading();

        const feeds = this.feeds;

        this.feedRepo.delete(feed).subscribe(res => {
            this.uiService.loaded();

            this.feeds.forEach(function (item, index) {
                if (item._id === feed._id) {
                    feeds.splice(index, 1);
                }
            });
        });
    }

    public onCancelDelete(feed: FeedDto): void {
        feed.isDeleteMode = false;
    }

    public onDeleteCategory(feed: FeedDto, categoryId: string): void {
        feed.categories.forEach(function (item, index) {
            if (item === categoryId) {
                feed.categories.splice(index, 1);
            }
        });
    }

    private getCategories(): void {
        this.uiService.loading();

        this.categoryRepo.getAll().subscribe(res => {
            this.onGetCategories(res);
        });
    }

    private getFeeds(): void {
        this.uiService.loading();

        this.feedRepo.getAll().subscribe(res => {
            this.onGetFeeds(res);
        });
    }

    private onAddFeed(result): void {
        this.uiService.loaded();

        this.getFeeds();
        this.feed = new FeedDto();
    }

    private onGetCategories(result): void {
        this.uiService.loaded();

        this.categories = result.categories;

        this.getFeeds();
    }

    private onGetFeeds(result): void {
        this.uiService.loaded();

        this.feeds = result.feeds;
    }
}
