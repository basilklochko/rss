import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { CategoryRepo } from '../service/categoryRepo';

import { AppBaseComponent } from './app.base';
import { Category } from '../model/category';
import { CategoryDto } from '../model/categoryDto';

@Component({
    selector: 'app-settings-categories',
    templateUrl: '../template/app.settingsCategories.html'
})

export class AppSettingsCategoriesComponent extends AppBaseComponent {
    public category: CategoryDto = new CategoryDto();
    public categories: CategoryDto[];

    constructor(securityService: SecurityService, uiService: UiService, router: Router, private categoryRepo: CategoryRepo) {
        super(securityService, uiService, router);

        this.getCategories();
    }

    public onEdit(category: CategoryDto): void {
        category.initName = category.name;
        category.isEditMode = true;
    }

    public onUpdate(category: CategoryDto): void {
        this.uiService.loading();

        this.categoryRepo.update(category).subscribe(res => {
            this.uiService.loaded();

            category.initName = category.name;
            category.isEditMode = false;
        });
    }

    public onCancel(category: CategoryDto): void {
        category.name = category.initName;
        category.isEditMode = false;
    }

    public onDelete(category: CategoryDto): void {
        category.isDeleteMode = true;
    }

    public onConfirmDelete(category: CategoryDto): void {
        this.uiService.loading();

        const categories = this.categories;

        this.categoryRepo.delete(category).subscribe(res => {
            this.uiService.loaded();

            this.categories.forEach(function (item, index) {
                if (item._id === category._id) {
                    categories.splice(index, 1);
                }
            });
        });
    }

    public onCancelDelete(category: CategoryDto): void {
        category.isDeleteMode = false;
    }

    public onClear(): void {
        this.category.name = '';
    }

    public onAdd(): void {
        this.uiService.loading();

        this.category.userId = this.securityService.user._id;

        this.categoryRepo.add(this.category).subscribe(res => {
            this.onAddCategory(res);
        });
    }

    private getCategories(): void {
        this.uiService.loading();

        this.categoryRepo.getAll().subscribe(res => {
            this.onGetCategories(res);
        });
    }

    private onAddCategory(result): void {
        this.uiService.loaded();

        this.getCategories();
        this.category = new CategoryDto();
    }

    private onGetCategories(result): void {
        this.uiService.loaded();

        this.categories = result.categories;
    }
}
