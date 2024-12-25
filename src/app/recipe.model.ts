export class Recipe {
    constructor(
        public id: string,
        public name: string,
        public time_preparation: string,
        public time_cooking: string,
        public portions_count: string,
        public ingredients: string[],
        public steps: string[],
        public categories: string[],
        public photos: string[]
    ) {}
}
