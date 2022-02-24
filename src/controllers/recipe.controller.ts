import {
    IRecipeInput,
    IRecipeInputKeys,
    ISearchRecipesOptions,
    SearchRecipesOptionsKeys
} from "@services/recipe.service";
import {Request, Response} from "express";
import transformerKey from "@shared/transformer";
import {ISortOptions, sortOptionsKeys} from "@shared/sort";

import {wrapperAPI} from "@actions/wrapper";
import {manyRecipesAction, randomRecipesAction, recipeAction, searchRecipeAction} from "@actions/query/recipe.query";
import {createRecipeAction, removeRecipeAction, updateRecipeAction} from "@actions/mutations/recipe.mutation";
import {bookmarkAction} from "@actions/mutations/bookmark.mutation";
import {manyReviewsActions} from "@actions/query/reviews.query";
import { postReviewAction } from "@actions/mutations/review.mutation";

export const create = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    return wrapperAPI(() => createRecipeAction(form, req), res)
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    return wrapperAPI(() => updateRecipeAction(req.params.id, form, req), res)
}

export const search = async (req: Request, res: Response): Promise<Response> => {

    // chứa keyword + category + page + limit
    const _form: ISearchRecipesOptions = transformerKey<ISearchRecipesOptions>(req.query, SearchRecipesOptionsKeys)

    return wrapperAPI(() => searchRecipeAction(_form), res)
}

export const getMany = async (req: Request, res: Response): Promise<Response> => {

    let _form: ISortOptions = transformerKey<ISortOptions>(req.query, sortOptionsKeys)

    return wrapperAPI(() => manyRecipesAction(_form), res)

}

export const single = async (req: Request, res: Response): Promise<Response> =>{
    return wrapperAPI(() => recipeAction(req.params.id, req), res)
}

export const remove = async ({ params, user }: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => removeRecipeAction(params.id, user), res)
}

export const random = async (req: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => randomRecipesAction(Number(req.query.size)), res)
}

export const bookmark = async ({ params, user }: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => bookmarkAction(params.slug!, user!), res)
}

export const getManyReviews = async ({ params, query }: Request, res: Response) => {
    let _form: ISortOptions = transformerKey<ISortOptions>(query, sortOptionsKeys)
    return wrapperAPI(() => manyReviewsActions(params.id, _form), res)
}

export const postReview = async ({ user, params, body }: Request, res: Response): Promise<Response> => {
    let form = {
        content: body.content,
        totalRating: body.totalRating,
        user: user!._id,
    }
    return wrapperAPI(() => postReviewAction(params.id, form), res)
}
