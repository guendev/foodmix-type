import {Request, Response} from "express";
import StatusCodes from "http-status-codes";

import {CategoryService, ICategoryInput, ICategoryInputKeys} from "@services/category.service";
import {ICategory} from "@models/category";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response";
import transformerKey from "@shared/transformer";
import {ISortOptions, SortOptions, sortOptionsKeys} from "@shared/sort";
import {IRecipe} from "@models/recipe";
import {RecipeService} from "@services/recipe.service";
import { wrapperAPI } from "@actions/wrapper";
import {allCategoryAction, oneCategoryAction} from "@actions/query/category.query";
import {createCategoryAction, updateCategoryAction} from "@actions/mutations/category.mutation";

const { OK, NOT_FOUND } = StatusCodes


const getAll = async (_: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => allCategoryAction(), res)
}

const getOne = async ({ params }: Request, res: Response) => {
    return wrapperAPI(() => oneCategoryAction(params.id), res)
}

const create = async (req: Request, res: Response) => {
    const form: ICategoryInput = transformerKey<ICategoryInput>(req.body, ICategoryInputKeys)
    return wrapperAPI(() => createCategoryAction(form), res)
}

const update = async (req: Request, res: Response) => {
    const form: ICategoryInput = transformerKey<ICategoryInput>(req.body, ICategoryInputKeys)
    return wrapperAPI(() => updateCategoryAction(req.params.id, form), res)
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
