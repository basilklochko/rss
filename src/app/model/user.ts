export class User {
    public _id: string;
    public email: string;
    public password: string;
    public isGoogle: boolean;
    public googleImageUrl: string;

    constructor() {
        this._id = null;
        this.email = '';
        this.password = '';
        this.isGoogle = false;
        this.googleImageUrl = '';
    }
}
