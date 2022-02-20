import {IRecipeCreateInput, IRecipeInput, IRecipeInputKeys, RecipeService} from "@services/recipe.service";
import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {IRecipe} from "@models/recipe";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@utils/response";
import { ICategory } from "@models/category";
import {CategoryService} from "@services/category.service";
import transformerKey from "@shared/transformer";

const { OK, FORBIDDEN } = StatusCodes

const create = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        return res.status(FORBIDDEN).json(new ResponseError( 'Phân loại không tồn tại', NotifyResponse.NOTIFY))
    }

    const user = req.user
    const doc: IRecipeCreateInput = {...form, user: user!._id, category: category._id}
    const recipe: IRecipe = await RecipeService.create(doc)

    return res.status(OK).json(new ResponseSuccess(recipe, 'Tạo mới thành công', NotifyResponse.NOTIFY))
}

export default {
    create
}
