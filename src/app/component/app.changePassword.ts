import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { UserRepo } from '../service/userRepo';

import { AppBaseComponent } from './app.base';
import { UserDto } from '../model/userDto';

@Component({
    selector: 'app-changepassword',
    templateUrl: '../template/app.changePassword.html'
})

export class AppChangePasswordComponent extends AppBaseComponent {
    public user: UserDto = new UserDto();
    public changed = false;

    constructor(securityService: SecurityService, uiService: UiService, router: Router, private userRepo: UserRepo) {
        super(securityService, uiService, router);

        this.user = securityService.user as UserDto;
        this.user.password = '';
    }

    public onChange(): void {
        const _router = this.router;
        const _secirityService = this.securityService;

        this.uiService.loading();

        this.userRepo.changePassword(this.user).subscribe(res => {
            this.uiService.loaded();

            this.changed = true;

            setTimeout(() => {
                _secirityService.signOut();
                _router.navigate(['/login']);
            }, 2000);
        });
    }

    public onCancel(): void {
        this.router.navigate(['/']);
    }
}
