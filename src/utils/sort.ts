export interface ISortOptions {
    sort: object,
    page: number,
    limit: number
}

export class SortOptions implements ISortOptions {
    limit: number;
    page: number;
    sort: object;

    constructor(sort: object, page: number, limit: number) {
        this.limit = limit > 0 && limit <= 20 ? limit : 20
        this.page = page
        this.sort = sort
    }

    public get skip(): number {
        return this.limit * this.page
    }

    public get sortFilter(): object {
        return Object.assign({}, this.sort, { _id: -1 })
    }
}


