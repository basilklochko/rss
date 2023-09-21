import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';

@Component({
    selector: 'app-logout',
    template: ''
})

export class AppLogoutComponent {
    constructor(private securityService: SecurityService, private router: Router) {
        securityService.signOut();
        this.router.navigate(['/login']);
    }
}
