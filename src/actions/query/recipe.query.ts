import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import StatusCodes from "http-status-codes";
import {ISearchRecipesOptions, RecipeService, SearchRecipesOptions} from "@services/recipe.service";
import {NotifyResponse} from "@shared/response";
import Events from "@events";
import {Request} from "express";
import {ICategory} from "@models/category";
import {CategoryService} from "@services/category.service";
import {IRecipe} from "@models/recipe";
import {ISortOptions, SortOptions} from "@shared/sort";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export const recipeAction = async (slug: string, req: Request): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }
    Events.recipe.viewRecipe(recipe, req)

    return {
        data: recipe
    }
}

export const searchRecipeAction = async (_form: ISearchRecipesOptions): Promise<IWrapperResponse> => {
    if(_form.category) {
        const category: ICategory|null = await CategoryService.getOne({ slug: _form.category })
        if(category) {
            _form.category = category._id
        } else {
            _form.category = undefined
        }
    }

    const form = new SearchRecipesOptions(_form)

    const recipes: IRecipe[] = await RecipeService.search(form)

    return {
        data: recipes
    }
}

export const manyRecipesAction = async (_form: ISortOptions): Promise<IWrapperResponse> => {
    let form: SortOptions = SortOptions.fromJSON(_form)
    const recipes: IRecipe[] = await RecipeService.getMany({}, form)
    return {
        data: recipes
    }
}

export const randomRecipesAction = async (size?: number): Promise<IWrapperResponse> => {
    const recipes = await RecipeService.random(Number(size))
    return {
        data: recipes
    }
}
