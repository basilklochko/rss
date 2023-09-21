import { Injectable, Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { User } from '../model/user';
import { UserDto } from '../model/userDto';

@Injectable()
export class SecurityService {
    public user: User = null;

    constructor(private cookieService: CookieService) {
        const cookie = this.cookieService.get('user');

        if (cookie != null && cookie !== 'null' && cookie.length > 0) {
            this.user = JSON.parse(cookie);
        }
    }

    public signIn(userDto: UserDto): void {
        this.user = new User();
        this.user._id = userDto._id;
        this.user.email = userDto.email;
        this.user.googleImageUrl = userDto.googleImageUrl;

        if (userDto.isRemembered) {
            this.cookieService.set('user', JSON.stringify(this.user), new Date('01/01/2999'));
        } else {
            this.cookieService.set('user', JSON.stringify(this.user));
        }
    }

    public signOut(): void {
        this.user = null;
        this.cookieService.delete('user');
    }
}
