import transformerKey from '@shared/transformer'
import { Request, Response } from 'express'
import StatusCodes from "http-status-codes"

import {ISortOptions, SortOptions, sortOptionsKeys} from "@utils/sort"
import {BookmarkService} from "@services/bookmark.service"
import { ResponseSuccess } from '@utils/response'

const { OK, NOT_FOUND } = StatusCodes

const many = async ({ query, user }: Request, res: Response) => {
    const _form = transformerKey<ISortOptions>(query, sortOptionsKeys)
    const options: SortOptions = SortOptions.fromJSON(_form)

    const bookmark = new BookmarkService(user!)
    const histories = await bookmark.getMany(options)

    return res.status(OK).json(new ResponseSuccess(histories))
}

export default {
    many
} as const
