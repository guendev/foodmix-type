export interface ISortOptions {
    sort: any,
    page: any,
    limit: any
}

export class SortOptions implements ISortOptions {
    limit: number;
    page: number;
    sort: object | string;

    constructor({ sort, page, limit }: ISortOptions) {
        this.limit = Number(limit) || 0
        this.page = Number(page) || 0
        this.sort = sort
    }

    public get skip(): number {
        return this.limitFilter * this.page
    }

    public get limitFilter(): number {
        return this.limit > 0 && this.limit <= 20 ? this.limit : 20
    }

    public get sortFilter(): object {
        return Object.assign({}, this.sort, { _id: -1 })
    }

    static fromJSON(json: ISortOptions): SortOptions {
        json.sort = typeof json.sort === 'string' ? { [json.sort]: -1 } : json.sort
        return new SortOptions(json)
    }
}

export const sortOptionsKeys: string[] = ['sort', 'page', 'limit']


