import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { SecurityService } from './securitySvc';

import { User } from '../model/user';

export class BaseRepo {
    constructor(protected securityService: SecurityService) {

    }

    protected createAuthOptions(): RequestOptions {
        const options = new RequestOptions({});
        options.headers = new Headers();
        options.headers.set('_id', this.securityService.user._id);

        return options;
    }
}
