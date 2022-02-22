import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {ParamsDictionary} from "express-serve-static-core";

import {CategoryService, ICategoryInput, ICategoryInputKeys} from "@services/category.service";
import {ICategory} from "@models/category";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response";
import transformerKey from "@shared/transformer";
import {ISortOptions, SortOptions, sortOptionsKeys} from "@shared/sort";
import {IRecipe} from "@models/recipe";
import {RecipeService} from "@services/recipe.service";

const { OK, NOT_FOUND } = StatusCodes


const getAll = async (_: Request, res: Response): Promise<Response> => {
    const categories: ICategory[] = await CategoryService.getAll()
    return res.status(OK).json(new ResponseSuccess(categories, 'Thành công'))
}

const getOne = async (req: Request, res: Response) => {
    const param: ParamsDictionary = req.params
    const category: ICategory|null = await CategoryService.getOne({ slug: param.id })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Không tìm thấy', NotifyResponse.HIDDEN))
    }
    return res.status(OK).json(new ResponseSuccess(category))
}

const create = async (req: Request, res: Response) => {
    const form: ICategoryInput = transformerKey<ICategoryInput>(req.body, ICategoryInputKeys)
    const category = await CategoryService.create(form)
    return res.status(OK).json(new ResponseSuccess(category, 'Tạo mới thành công', NotifyResponse.NOTIFY))
}

const update = async (req: Request, res: Response) => {
    const category: ICategory|null = await CategoryService.getOne({ slug: req.params.id })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Không tìm thấy phaan loai', NotifyResponse.HIDDEN))
    }
    const form: ICategoryInput = transformerKey<ICategoryInput>(req.body, ICategoryInputKeys)

    const _updated = await CategoryService.update({ _id: category._id }, form)
    return res.status(OK).json(new ResponseSuccess(_updated, 'Cap nhat thành công', NotifyResponse.NOTIFY))
}

const recipes = async (req: Request, res: Response) => {
    const category: ICategory|null = await CategoryService.getOne({ slug: req.params.id })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Không tìm thấy phaan loai', NotifyResponse.HIDDEN))
    }

    let _form: ISortOptions = transformerKey<ISortOptions>(req.query, sortOptionsKeys)
    let form: SortOptions = SortOptions.fromJSON(_form)

    const recipes: IRecipe[] = await RecipeService.getMany({ category: category._id}, form)
    return res.status(OK).json(new ResponseSuccess(recipes))
}

export default {
    getAll,
    getOne,
    create,
    update,
    recipes
} as const
