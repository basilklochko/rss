import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SecurityService } from './securitySvc';
import { BaseRepo } from './baseRepo';

import { Feed } from '../model/feed';
import { FeedDto } from '../model/feedDto';
import { FeedMapper } from '../model/feedMapper';
import { CategoryDto } from '../model/categoryDto';

@Injectable()
export class FeedRepo extends BaseRepo {
    constructor(private http: Http, securityService: SecurityService) {
        super(securityService);
    }

    public getRss(feed: FeedDto): Observable<any> {
        return this.http.get('/api/getRss/' + feed._id, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getRssStructure(feed: FeedDto): Observable<any> {
        return this.http.post('/api/getRssStructure', feed, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllByCategory(category: CategoryDto): Observable<FeedDto[]> {
        return this.http.get('/api/getFeedsByCategory/' + category._id, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getAll(): Observable<FeedDto[]> {
        return this.http.get('/api/getFeeds', this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public add(feedDto: FeedDto): Observable<FeedDto[]> {
        const feed = new Feed();
        feed.url = feedDto.url;
        feed.name = feedDto.name;
        feed.userId = feedDto.userId;
        feed.feedMapper = feedDto.feedMapper;
        feed.categories = feedDto.categories;

        return this.http.post('/api/addFeed', feed, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public update(feedDto: FeedDto): Observable<FeedDto> {
        const feed = new Feed();
        feed._id = feedDto._id;
        feed.url = feedDto.url;
        feed.name = feedDto.name;
        feed.userId = feedDto.userId;
        feed.feedMapper = feedDto.feedMapper;
        feed.categories = feedDto.categories;

        return this.http.post('/api/updateFeed', feed, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public delete(feeDto: FeedDto): Observable<FeedDto> {
        const feed = new Feed();
        feed._id = feeDto._id;

        return this.http.post('/api/deleteFeed', feed, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
