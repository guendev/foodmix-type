import {IUser} from "@models/user";

const hasPermission = (user: IUser): boolean => {
    return ['mod', 'admin', 'sp_admin'].includes(user.role)
}

const modQuery = (user: IUser, field?: string): { [p: string]: any } => {
    return {
        [field || 'user']: hasPermission(user) ? { $exists: true } : user._id
    }
}

const mergeModQuery = (filter: object, user: IUser, field?: string): object => {
    return Object.assign({}, filter, modQuery(user, field))
}

export {
    hasPermission,
    modQuery,
    mergeModQuery
}
