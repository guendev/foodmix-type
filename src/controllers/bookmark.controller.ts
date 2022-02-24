import transformerKey from '@shared/transformer'
import {Request, Response} from 'express'

import {ISortOptions, sortOptionsKeys} from "@shared/sort"
import {wrapperAPI} from "@actions/wrapper";
import {manyBookmarksAction} from "@actions/query/bookmark.query";
import {deleteAllBookmarksAction, removeBookmarkAction} from "@actions/mutations/bookmark.mutation";



const many = async ({ query, user }: Request, res: Response) => {
    const _form = transformerKey<ISortOptions>(query, sortOptionsKeys)
    return wrapperAPI(() => manyBookmarksAction(user!, _form), res)
}

const remove = async ({ params, user }: Request, res: Response) => {
    return wrapperAPI(() => removeBookmarkAction(params.id, user!), res)
}

const deleteMany = async ({ user }: Request, res: Response) => {
    return wrapperAPI(() => deleteAllBookmarksAction(user!), res)
}

export default {
    many,
    remove,
    deleteMany
} as const
