import {Types} from "mongoose";
import {IReview, Review} from "@models/review";
import {SortOptions} from "@utils/sort";

export class ReviewService {
    constructor() {}

    static async add(input: IReviewInput): Promise<IReview> {
        return Review.create({ ...input, createdAt: Date.now() })
    }

    static async getMany(filter: object, options: SortOptions): Promise<IReview[]> {
        return Review.find(filter)
            .sort(options.sortFilter)
            .skip(options.skip)
            .limit(options.limitFilter)
            .lean<IReview[]>()
    }
}

export interface IReviewInput {
    user: Types.ObjectId
    recipe: Types.ObjectId
    content: string
    totalRating: number
}
