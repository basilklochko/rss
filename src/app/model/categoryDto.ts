import { Category } from './category';

export class CategoryDto extends Category {
    public isEditMode = false;
    public isDeleteMode = false;
    public initName: string = this.name;

    constructor() {
        super();
    }
}
