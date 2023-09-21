import { User } from './user';

export class UserDto extends User {
    public passwordcheck: string;
    public isPasswordMatch: boolean;
    public error: string;
    public isRemembered: boolean;

    constructor() {
        super();

        this.passwordcheck = '';
        this.error = '';
        this.isRemembered = false;
    }

    public isValid(): boolean {
        return this.email.length === 0 || this.password.length === 0 || this.passwordcheck.length === 0;
    }

    public isEmailValid(): boolean {
        if (this.email == null || this.email.length === 0) {
            return true;
        }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
    }
}
