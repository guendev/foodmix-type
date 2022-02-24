import {IUser, User} from "@models/user";
import {IRecipe, Recipe} from "@models/recipe";
import { IBookmark, Bookmark } from "@models/bookmark";
import {Types} from "mongoose";
import {SortOptions} from "@shared/sort";
import {IRelationship} from "@shared/relationship";

export class BookmarkService {
    user: IUser

    constructor(user: IUser) {
        this.user = user
    }

    async store(recipe: IRecipe): Promise<IBookmark> {
        return Bookmark.findOneAndUpdate(
            {
                user: this.user._id,
                recipe: recipe._id
            },
            { createdAt: Date.now() },
            { returnOriginal: false, upsert: true }
        )
    }

    async delete(_id: Types.ObjectId) {
        return Bookmark.findOneAndDelete({ user: this.user._id, _id })
    }

    async deleteALl() {
        return Bookmark.deleteMany({ user: this.user._id })
    }

    async exist(recipe: IRecipe) {
        return Bookmark.findOne({ user: this.user._id, recipe: recipe._id })
    }

    async count() {
        return Bookmark.find({ user: this.user._id }).countDocuments()
    }

    async getMany(options: SortOptions, populates: IRelationship[] = []): Promise<IBookmark[]> {
        return Bookmark.find({ user: this.user._id })
            .populate(populates)
            .sort(options.sortFilter)
            .skip(options.skip)
            .limit(options.limitFilter)
    }

    static get RELATIONSHIP(): { [key: string]: IRelationship } {
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
