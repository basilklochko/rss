import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CategoryRepo } from '../service/categoryRepo';

import { CategoryDto } from '../model/categoryDto';
import { FeedDto } from '../model/feedDto';

@Component({
    selector: 'app-category-multi',
    templateUrl: '../template/app.categoryMulti.html'
})

export class AppCategoryMultiComponent {
    @Output() categoriesUpdated = new EventEmitter();
    @Input() feed: FeedDto = null;
    @Input() isEditMode = false;

    public categories: CategoryDto[] = [];
    public selectedCategory = '';
    public selectedCategories: CategoryDto[] = new Array(0);

    constructor(private categoryRepo: CategoryRepo) {
        this.getCategories();
    }

    public onAdd(): void {
        if (this.selectedCategory == null || this.selectedCategory === '') {
            return;
        }

        let isAdded = false;
        const that = this;

        this.selectedCategories.forEach(function (item) {
            if (item._id === that.selectedCategory) {
                isAdded = true;
            }
        });

        if (!isAdded) {
            this.categories.forEach(function (item) {
                if (item._id === that.selectedCategory) {
                    that.selectedCategories.push(item);
                    that.categoriesUpdated.emit({ selectedCategories: that.selectedCategories, feed: that.feed });
                }
            });
        }
    }

    public onDeleteCategory(category: CategoryDto): void {
        const that = this;

        this.selectedCategories.forEach(function (item, index) {
            if (item._id === category._id) {
                that.selectedCategories.splice(index, 1);
                that.categoriesUpdated.emit({ selectedCategories: that.selectedCategories, feed: that.feed });
            }
        });
    }

    private getCategories(): void {
        this.categoryRepo.getAll().subscribe(res => {
            this.onGetCategories(res);
        });
    }

    private onGetCategories(result): void {
        this.categories = result.categories;

        if (this.feed !== undefined && this.feed != null) {
            this.selectedCategories = this.getCategoriesByIds(this.feed.categories);
        }
    }

    private getCategoriesByIds(ids: string[]): CategoryDto[] {
        const result: CategoryDto[] = Array(0);

        if (this.categories != null) {
            this.categories.forEach(function (item) {
                ids.forEach(function (id) {
                    if (item._id === id) {
                        result.push(item);
                    }
                });
            });
        }

        return result;
    }
}
