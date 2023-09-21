import { Component } from '@angular/core';

import { SecurityService } from '../service/securitySvc';

@Component({
    selector: 'app-menu',
    templateUrl: '../template/app.menu.html'
})

export class AppMenuComponent {
    constructor(public securityService: SecurityService) {

    }
}
