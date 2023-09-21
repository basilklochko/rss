import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserRepo } from '../service/userRepo';

import { UserDto } from '../model/userDto';

@Component({
    selector: 'app-newuser',
    templateUrl: '../template/app.newUser.html'
})

export class AppNewUserComponent {
    public user: UserDto = new UserDto();

    constructor(private userRepo: UserRepo, private router: Router) {

    }

    public onSignUp(): void {
        this.user.error = '';

        if (this.user.isEmailValid() && this.user.password === this.user.passwordcheck) {
            this.userRepo.create(this.user).subscribe(res => {
                this.onUserCreated(res);
            });
        }
    }

    private onUserCreated(res: UserDto): void {
        const that = this;
        this.user._id = res._id;
        this.user.error = res.error;

        if (this.user.error.length > 0) {

        } else if (this.user._id.length > 0) {
            setTimeout(() => {
                that.router.navigate(['/login']);
            }, 2000);
        } else {
            this.user.error = 'User has not been created.';
        }
    }
}
