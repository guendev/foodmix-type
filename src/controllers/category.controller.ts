import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {ParamsDictionary} from "express-serve-static-core";

import {CategoryService, ICategoryInput} from "@services/category.service";
import {ICategory} from "@models/category";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@utils/response";

const { OK, NOT_FOUND } = StatusCodes


const getAll = async (_: Request, res: Response): Promise<Response> => {
    const categories: ICategory[] = await CategoryService.getAll()
    return res.status(OK).json(new ResponseSuccess(categories, 'Thành công'))
}

const getOne = async (req: Request, res: Response) => {
    const param: ParamsDictionary = req.params
    const category: ICategory|null = await CategoryService.getOne({ slug: param.slug })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Không tìm thấy', NotifyResponse.HIDDEN))
    }
    return res.status(OK).json(new ResponseSuccess(category))
}

// Todo: Chuyển vào admin router
const create = async (req: Request, res: Response) => {
    const form: ICategoryInput = req.body
    const category = await CategoryService.create(form)
    return res.status(OK).json(new ResponseSuccess(category, 'Tạo mới thành công', NotifyResponse.NOTIFY))
}

export default {
    getAll,
    getOne,
    create
} as const
