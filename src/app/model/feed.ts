import { FeedMapper } from './feedMapper';

export class Feed {
    public _id: string;
    public url: string;
    public name: string;
    public userId: string;

    public categories: string[];
    public feedMapper: FeedMapper;

    constructor() {
        this.url = '';
        this.name = '';
        this.categories = new Array(0);
    }
}
