import { Router } from '@angular/router';

import { SecurityService } from '../service/securitySvc';
import { UiService } from '../service/uiSvc';

export class AppBaseComponent {
    constructor(protected securityService: SecurityService, protected uiService: UiService, protected router: Router) {
        if (this.securityService.user == null) {
            this.router.navigate(['/login']);
        }
    }
}
