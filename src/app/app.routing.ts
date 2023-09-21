import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLoginComponent } from './component/app.login';
import { AppRemindComponent } from './component/app.remind';
import { AppLogoutComponent } from './component/app.logout';
import { AppDeleteAccountComponent } from './component/app.deleteAccount';
import { AppNewUserComponent } from './component/app.newUser';
import { AppHomeComponent } from './component/app.home';
import { AppChangePasswordComponent } from './component/app.changePassword';
import { AppSettingsCategoriesComponent } from './component/app.settingsCategories';
import { AppSettingsFeedsComponent } from './component/app.settingsFeeds';

export const AppPaths: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppHomeComponent },
    { path: 'home/:categoryId', component: AppHomeComponent },
    { path: 'home/:categoryId/:feedId', component: AppHomeComponent },
    { path: 'changepassword', component: AppChangePasswordComponent },
    { path: 'login', component: AppLoginComponent },
    { path: 'remind', component: AppRemindComponent },
    { path: 'deleteaccount', component: AppDeleteAccountComponent },
    { path: 'logout', component: AppLogoutComponent },
    { path: 'newuser', component: AppNewUserComponent },
    { path: 'settings/categories', component: AppSettingsCategoriesComponent },
    { path: 'settings/feeds', component: AppSettingsFeedsComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppPaths);
