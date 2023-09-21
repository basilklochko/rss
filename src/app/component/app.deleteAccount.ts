import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { UserRepo } from '../service/userRepo';

import { AppBaseComponent } from './app.base';
import { UserDto } from '../model/userDto';

declare var signOut: any;

@Component({
    selector: 'app-delete-account',
    templateUrl: '../template/app.deleteAccount.html'
})

export class AppDeleteAccountComponent extends AppBaseComponent {
    constructor(securityService: SecurityService, uiService: UiService, router: Router, private userRepo: UserRepo) {
        super(securityService, uiService, router);
    }

    public onDelete(): void {
        this.userRepo.delete(this.securityService.user as UserDto).subscribe((res) => {
            signOut();
        });
    }

    public onCancel(): void {
        this.router.navigate(['/']);
    }
}
