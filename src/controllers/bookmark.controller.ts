import transformerKey from '@shared/transformer'
import {Request, Response} from 'express'
import StatusCodes from "http-status-codes"
import {Types} from "mongoose"

import {ISortOptions, SortOptions, sortOptionsKeys} from "@utils/sort"
import {BookmarkService} from "@services/bookmark.service"
import {NotifyResponse, ResponseError, ResponseSuccess} from '@utils/response'

const { OK, NOT_FOUND, FORBIDDEN } = StatusCodes

const many = async ({ query, user }: Request, res: Response) => {
    const _form = transformerKey<ISortOptions>(query, sortOptionsKeys)
    const options: SortOptions = SortOptions.fromJSON(_form)

    const bookmark = new BookmarkService(user!)
    const histories = await bookmark.getMany(options)

    return res.status(OK).json(new ResponseSuccess(histories))
}

const remove = async ({ params, user }: Request, res: Response) => {
    const bookmark = new BookmarkService(user!)
    // Todo: check objectID
    if(!Types.ObjectId.isValid(params.id)) {
        return res.status(FORBIDDEN).json(new ResponseError('ID khong lop le', NotifyResponse.NOTIFY))
    }
    const _id: Types.ObjectId = new Types.ObjectId(params.id)
    const check = await bookmark.delete(_id)
    if(!check) {
        return res.status(NOT_FOUND).json(new ResponseError('Bookmark khong ton tai', NotifyResponse.NOTIFY))
    }
    return res.status(OK).json(new ResponseSuccess(check, 'Xoa thanh cong'))
}

export default {
    many,
    remove
} as const
