import {IUser, User} from '@models/user'
import { SortOptions } from "@shared/sort"

class UserService {
    constructor() {}

    /**
     * @param filter
     * @param exclude
     * @returns {Promise<IUser>}
     */
    static async getOne(filter: object, exclude = '-password') {
        return User.findOne(filter).select(exclude).lean<IUser>()
    }

    static async getMany({ order, sortOptions }: { order: string, sortOptions: SortOptions }) {
        return User.find()
            .sort(Object.assign({}, sortOptions.sort, { _id: -1 }))
            .skip(sortOptions.skip)
            .limit(sortOptions.limit)
            .lean()
    }

    static async count() {
        return User.find().countDocuments().lean()
    }

    static async create(input: IUserCreateInput): Promise<IUser> {
        // const check: IUser = await this.getOne({ email: input.email })
        // if(check) {
            // user đã tồn tại
        // }
        // validate tại controller
        return User.create(input)
    }

    static async update(filter: object, input: IUserUpdateInput) {
        return User.findOneAndUpdate(filter, input).lean()
    }

}

interface IUserCreateInput {
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: number
}

interface IUserUpdateInput {
    name: string,
    email: string,
    avatar: string,
    banner: string,
    about: string,
    province: string,
}

interface IUserSignInInput {
    email: string,
    password: string
}

export {
    UserService,
    IUserCreateInput,
    IUserUpdateInput,
    IUserSignInInput
}
