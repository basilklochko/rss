import { Injectable, Component } from '@angular/core';

@Injectable()
export class UiService {
    constructor() {

    }

    public isLoading = false;

    public loading(): void {
        this.isLoading = true;
    }

    public loaded(): void {
        this.isLoading = false;
    }
}
