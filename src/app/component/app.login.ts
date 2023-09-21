import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { UserRepo } from '../service/userRepo';

import { UserDto } from '../model/userDto';

@Component({
    selector: 'app-login',
    templateUrl: '../template/app.login.html'
})

export class AppLoginComponent {
    public user: UserDto = new UserDto();
    public currentUser: UserDto = this.securityService.user as UserDto;

    constructor(private securityService: SecurityService, private userRepo: UserRepo, private router: Router, private uiService: UiService) {
        const that = this;

        if (this.currentUser != null && this.currentUser._id === '' && this.currentUser.isGoogle) {
            this.currentUser.password = '';

            this.userRepo.login(this.currentUser).subscribe(loginRes => {
                if (loginRes._id === '') {
                    this.userRepo.create(this.currentUser).subscribe((createRes) => {
                        if (createRes._id !== '') {
                            that.currentUser._id = createRes._id;
                            that.securityService.signIn(that.currentUser);
                            that.router.navigate(['/']);
                        }
                    });
                } else {
                    that.currentUser._id = loginRes._id;
                    that.securityService.signIn(that.currentUser);
                    that.router.navigate(['/']);
                }
            });
        }
    }

    public onSignIn(): void {
        if (this.user.isEmailValid()) {
            this.uiService.loading();

            this.userRepo.login(this.user).subscribe(res => {
                this.onUserLoggedIn(res);
            });
        }
    }

    private onUserLoggedIn(res: UserDto): void {
        this.uiService.loaded();

        const that = this;
        this.user._id = res._id;
        this.user.error = res.error;

        if (this.user.error.length > 0) {

        } else if (this.user._id.length > 0) {
            that.securityService.signIn(this.user);
            that.router.navigate(['/']);
        } else {
            this.user.error = 'User was not signed in.';
        }
    }
}
