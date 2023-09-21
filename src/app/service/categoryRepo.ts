import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SecurityService } from './securitySvc';
import { BaseRepo } from './baseRepo';

import { Category } from '../model/category';
import { CategoryDto } from '../model/categoryDto';

@Injectable()
export class CategoryRepo extends BaseRepo {
    constructor(private http: Http, securityService: SecurityService) {
        super(securityService);
    }

    public getAll(): Observable<CategoryDto[]> {
        return this.http.get('/api/getCategories', this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public add(categoryDto: CategoryDto): Observable<CategoryDto[]> {
        const category = new Category();
        category.name = categoryDto.name;
        category.userId = categoryDto.userId;

        return this.http.post('/api/addCategory', category, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public update(categoryDto: CategoryDto): Observable<CategoryDto> {
        const category = new Category();
        category._id = categoryDto._id;
        category.name = categoryDto.name;
        category.userId = categoryDto.userId;

        return this.http.post('/api/updateCategory', category, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public delete(categoryDto: CategoryDto): Observable<CategoryDto> {
        const category = new Category();
        category._id = categoryDto._id;

        return this.http.post('/api/deleteCategory', category, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
