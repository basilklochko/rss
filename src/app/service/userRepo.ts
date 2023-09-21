import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SecurityService } from './securitySvc';
import { BaseRepo } from './baseRepo';

import { UserDto } from '../model/userDto';
import { User } from '../model/user';
import { Email } from '../model/email';

@Injectable()
export class UserRepo extends BaseRepo {
    constructor(private http: Http, securityService: SecurityService) {
        super(securityService);
    }

    remind(userDto: UserDto): Observable<UserDto> {
        const email: Email = new Email();
        email.to = userDto.email;
        email.subject = 'RSS Reader: Password Reminder';
        email.body = 'Your password is: ';

        return this.http.post('/api/remind', email)
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(userDto: UserDto): Observable<UserDto> {
        const user: User = new User();
        user._id = userDto._id;

        return this.http.post('/api/deleteUser', user, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(userDto: UserDto): Observable<UserDto> {
        const user: User = new User();
        user.email = userDto.email;
        user.password = userDto.password;
        user.isGoogle = userDto.isGoogle;

        return this.http.post('/api/createUser', user)
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    login(userDto: UserDto): Observable<UserDto> {
        const user: User = new User();
        user.email = userDto.email;
        user.password = userDto.password;
        user.isGoogle = userDto.isGoogle;

        return this.http.post('/api/loginUser', user)
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    changePassword(userDto: UserDto): Observable<UserDto> {
        const user: User = new User();
        user._id = userDto._id;
        user.email = userDto.email;
        user.password = userDto.password;

        return this.http.post('/api/changePassword', user, this.createAuthOptions())
            .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
