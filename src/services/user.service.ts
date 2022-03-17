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
        return User.findOne(filter).select(exclude)
    }

    static async getMany(filter: object, sortOptions: SortOptions) {
        return User.find(filter)
            .sort(sortOptions.sortFilter)
            .skip(sortOptions.skip)
            .limit(sortOptions.limitFilter)
    }

    static async count() {
        return User.find().countDocuments().lean()
    }

    static async create(input: IUserCreateInput): Promise<IUser> {
        return User.create(input)
    }

    static async update(filter: object, input: IUserUpdateInput) {
        return User.findOneAndUpdate(filter, input, { returnOriginal: false })
    }

    static async updatePassword(filter: object, hash: String) {
        return User.findOneAndUpdate(filter, { password: hash }, { returnOriginal: false })
    }

}

interface IUserUpdatePasswordInput {
    currentPassword: string
    newPassword: string
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
    avatar: string,
    banner: string,
    about: string,
    province: string,
    gender: number
}

interface IUserSignInInput {
    email: string,
    password: string
}

export {
    UserService,
    IUserCreateInput,
    IUserUpdateInput,
    IUserSignInInput,
    IUserUpdatePasswordInput
}
