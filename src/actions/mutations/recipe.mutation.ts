import StatusCodes from "http-status-codes"
import {CategoryService} from "@services/category.service";
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";
import {IRecipeCreateInput, IRecipeInput, RecipeService} from "@services/recipe.service";
import {Request} from "express";
import {ICategory} from "@models/category";
import {IRecipe} from "@models/recipe";
import {mergeModQuery} from "@shared/permission";
import {IUser} from "@models/user";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export const createRecipeAction = async (form: IRecipeInput, req: Request): Promise<IWrapperResponse> => {
    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Phân loại không tồn tại', status: NOT_FOUND })
    }

    const user = req.user
    const doc: IRecipeCreateInput = {...form, user: user!._id, category: category._id}
    const recipe: IRecipe = await RecipeService.create(doc)

    return {
        data: recipe
    }
}

export const updateRecipeAction = async (slug: string, form: IRecipeInput, req: Request): Promise<IWrapperResponse> => {

    const user = req.user
    const recipe: IRecipe | null = await RecipeService.getOne(mergeModQuery({ slug }, user!))

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Công thức không tồn tại', status: NOT_FOUND})
    }

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Phân loại không tồn tại', status: NOT_FOUND })
    }

    form.category = category._id
    const _recipe = await RecipeService.update({ _id: recipe._id }, form)

    return {
        code: NotifyResponse.NOTIFY,
        data: _recipe,
        msg: 'Cập nhật thành công'
    }

}

export const removeRecipeAction = async (slug: string, user?: IUser): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.delete(mergeModQuery({ slug }, user!))

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Công thức không tồn tại', status: NOT_FOUND})
    }

    return {
        msg: 'Xoá thành công',
        data: recipe,
        code: NotifyResponse.NOTIFY
    }
}


