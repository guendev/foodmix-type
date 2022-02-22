import {IUser} from "@models/user"
import {IRecipe} from "@models/recipe"
import {History, IHistory} from "@models/history"
import {SortOptions} from "@utils/sort"
import {Types} from "mongoose"

class HistoryService {
    user: IUser

    constructor(user: IUser) {
        this.user = user
    }

    async add(recipe: IRecipe): Promise<IHistory> {
        return History.findOneAndUpdate(
            { user: this.user._id, recipe: recipe._id },
            { createdAt: Date.now() },
            { upsert: true }
        ).lean<IHistory>()
    }

    async getMany(options: SortOptions): Promise<IHistory[]> {
        return History.find({ user: this.user._id })
            .sort(options.sortFilter)
            .skip(options.skip)
            .limit(options.limitFilter)
            .lean<IHistory[]>()
    }

    async delete(_id: Types.ObjectId): Promise<IHistory|null> {
        return History.findOneAndDelete({ _id, user: this.user._id }).lean<IHistory|null>()
    }

    async deleteALl() {
        return History.deleteMany({ user: this.user._id}).lean()
    }

    async count(): Promise<number> {
        return History.find({ user: this.user._id }).countDocuments()
    }
}

export {
    HistoryService
}
