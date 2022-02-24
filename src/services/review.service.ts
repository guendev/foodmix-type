import {Types} from "mongoose";
import {IReview, Review} from "@models/review";
import {SortOptions} from "@shared/sort";
import {IRelationship} from "@shared/relationship";
import {User} from "@models/user";
import {Recipe} from "@models/recipe";

export class ReviewService {
    constructor() {}

    static async add(input: IReviewInput): Promise<IReview> {
        return Review.create({ ...input, createdAt: Date.now() })
    }

    static async getMany(filter: object, options: SortOptions, populates: IRelationship[] = []): Promise<IReview[]> {
        return Review.find(filter)
            .populate(populates)
            .sort(options.sortFilter)
            .skip(options.skip)
            .limit(options.limitFilter)
    }

    static get RELATIONSHIP() {
        return {
            USER: {
                model: User,
                path: 'user'
            },
            RECIPE: {
                model: Recipe,
                path: 'recipe'
            }
        }
    }
}

export interface IReviewInput {
    user: Types.ObjectId
    recipe: Types.ObjectId
    content: string
    totalRating: number
}
