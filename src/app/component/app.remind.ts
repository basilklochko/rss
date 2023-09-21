import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';
import { UserRepo } from '../service/userRepo';

import { UserDto } from '../model/userDto';

@Component({
    selector: 'app-remind',
    templateUrl: '../template/app.remind.html'
})

export class AppRemindComponent {
    public user: UserDto = new UserDto();

    constructor(private securityService: SecurityService, private userRepo: UserRepo, private router: Router, private uiService: UiService) {
        const that = this;
    }

    public onSend(): void {
        this.userRepo.remind(this.user).subscribe((res) => {
            this.onSended(res);
        });
    }

    private onSended(res): void {
        this.user._id = '0';

        if (res != null && res.result) {
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 2000);
        } else {
            this.user.error = 'Password has been sent.';
        }
    }
}
