import {CategoryService} from "@services/category.service";
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {ICategory} from "@models/category";
import { NotifyResponse } from "@shared/response";
import StatusCodes from "http-status-codes";
import {ISortOptions, SortOptions} from "@shared/sort";
import {IRecipe} from "@models/recipe";
import {RecipeService} from "@services/recipe.service";

const { OK, FORBIDDEN, BAD_REQUEST } = StatusCodes

export const allCategoryAction = async (): Promise<IWrapperResponse> => {
    const categories = await CategoryService.getAll()
    return {
        data: categories
    }
}

export const oneCategoryAction = async (slug: string): Promise<IWrapperResponse> => {
    const category: ICategory|null = await CategoryService.getOne({ slug: slug })
    if(!category) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Phân loại không tồn tại', status: BAD_REQUEST })
    }
    return {
        data: category
    }
}

export const categoryToRecipesAction = async (slug: string, _form: ISortOptions): Promise<IWrapperResponse> => {
    const category: ICategory|null = await CategoryService.getOne({ slug: slug })
    if(!category) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Phân loại không tồn tại', status: BAD_REQUEST })
    }

    let form: SortOptions = SortOptions.fromJSON(_form)

    const recipes: IRecipe[] = await RecipeService.getMany({ category: category._id}, form, [RecipeService.RELATIONSHIP.CATEGORY, RecipeService.RELATIONSHIP.USER])

    return {
        data: recipes
    }
}
