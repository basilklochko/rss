import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { SecurityService } from './service/securitySvc';
import { UiService } from './service/uiSvc';
import { UserRepo } from './service/userRepo';
import { CategoryRepo } from './service/categoryRepo';
import { FeedRepo } from './service/feedRepo';

import { AppLoginComponent } from './component/app.login';
import { AppRemindComponent } from './component/app.remind';
import { AppLogoutComponent } from './component/app.logout';
import { AppDeleteAccountComponent } from './component/app.deleteAccount';
import { AppNewUserComponent } from './component/app.newUser';
import { AppMenuComponent } from './component/app.menu';
import { AppHomeComponent } from './component/app.home';
import { AppChangePasswordComponent } from './component/app.changePassword';
import { AppSettingsCategoriesComponent } from './component/app.settingsCategories';
import { AppSettingsFeedsComponent } from './component/app.settingsFeeds';
import { AppCategoryMultiComponent } from './component/app.categoryMulti';
import { AppComponent } from './component/app.component';
import { AppPaths, AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppLoginComponent,
    AppRemindComponent,
    AppLogoutComponent,
    AppDeleteAccountComponent,
    AppNewUserComponent,
    AppMenuComponent,
    AppHomeComponent,
    AppChangePasswordComponent,
    AppSettingsCategoriesComponent,
    AppSettingsFeedsComponent,
    AppCategoryMultiComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [CookieService, SecurityService, UiService, UserRepo, CategoryRepo, FeedRepo],
  bootstrap: [AppMenuComponent, AppComponent]
})

export class AppModule { }

