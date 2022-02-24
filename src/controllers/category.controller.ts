import {Request, Response} from "express";

import {ICategoryInput, ICategoryInputKeys} from "@services/category.service";
import transformerKey from "@shared/transformer";
import {ISortOptions, sortOptionsKeys} from "@shared/sort";
import { wrapperAPI } from "@actions/wrapper";
import {allCategoryAction, categoryToRecipesAction, oneCategoryAction} from "@actions/query/category.query";
import {createCategoryAction, updateCategoryAction} from "@actions/mutations/category.mutation";


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
    let _form: ISortOptions = transformerKey<ISortOptions>(req.query, sortOptionsKeys)
    return wrapperAPI(() => categoryToRecipesAction(req.params.id, _form), res)
}

export default {
    getAll,
    getOne,
    create,
    update,
    recipes
} as const
