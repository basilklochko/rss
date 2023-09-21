import { Feed } from './feed';
import { FeedMapper } from './feedMapper';

export class FeedDto extends Feed {
    public isEditMode = false;
    public isDeleteMode = false;
    public initName: string = this.name;
    public initMapper: FeedMapper = this.feedMapper;
    public initCategories: string[] = this.categories;

    constructor() {
        super();
    }

    public isUrlValid(): boolean {
        if (this.url == null || this.url.length === 0) {
            return true;
        }

        const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(this.url);
    }
}
