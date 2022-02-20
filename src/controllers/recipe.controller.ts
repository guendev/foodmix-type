import {
    IRecipeCreateInput,
    IRecipeInput,
    IRecipeInputKeys,
    RecipeService, SearchRecipesOptions,
    SearchRecipesOptionsKeys
} from "@services/recipe.service";
import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {IRecipe} from "@models/recipe";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@utils/response";
import { ICategory } from "@models/category";
import {CategoryService} from "@services/category.service";
import transformerKey from "@shared/transformer";
import {ParamsDictionary} from "express-serve-static-core";
import {mergeModQuery} from "@shared/permission";

const { OK, NOT_FOUND } = StatusCodes

const create = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Phân loại không tồn tại', NotifyResponse.NOTIFY))
    }

    const user = req.user
    const doc: IRecipeCreateInput = {...form, user: user!._id, category: category._id}
    const recipe: IRecipe = await RecipeService.create(doc)

    return res.status(OK).json(new ResponseSuccess(recipe, 'Tạo mới thành công', NotifyResponse.NOTIFY))
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)
    const param: ParamsDictionary = req.params
    const user = req.user

    const recipe: IRecipe | null = await RecipeService.getOne(mergeModQuery({ slug: param.id }, user!))
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Phân loại không tồn tại', NotifyResponse.NOTIFY))
    }

    form.category = category._id
    const _recipe = await RecipeService.update({ _id: recipe._id }, form)

    return res.status(OK).json(new ResponseSuccess(_recipe, 'Cập nhật thành công', NotifyResponse.NOTIFY))
}

const search = async (req: Request, res: Response): Promise<Response> => {

    // chứa keyword + category + page + limit
    let form: SearchRecipesOptions = transformerKey<SearchRecipesOptions>(req.query, SearchRecipesOptionsKeys)
    if(form.category) {
        const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
        if(category) {
            form.category = category._id
        } else {
            form.category = undefined
        }
    }

    form = new SearchRecipesOptions({ ...form })

    const recipes: IRecipe[] = await RecipeService.search(form)

    return res.status(OK).json(new ResponseSuccess(recipes, 'Cập nhật thành công', NotifyResponse.NOTIFY))
}

export default {
    create,
    update,
    search
}
