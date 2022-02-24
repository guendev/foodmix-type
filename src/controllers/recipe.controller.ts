import {
    IRecipeInput,
    IRecipeInputKeys,
    ISearchRecipesOptions,
    RecipeService,
    SearchRecipesOptionsKeys
} from "@services/recipe.service";
import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response";
import transformerKey from "@shared/transformer";
import {ISortOptions, SortOptions, sortOptionsKeys} from "@shared/sort";
import {BookmarkService} from "@services/bookmark.service";
import {IReviewInput, ReviewService} from "@services/review.service";
import {IReview} from "@models/review"

const { OK, NOT_FOUND } = StatusCodes

import Events from '@events'

import {wrapperAPI} from "@actions/wrapper";
import {manyRecipesAction, randomRecipesAction, recipeAction, searchRecipeAction} from "@actions/query/recipe.query";
import {createRecipeAction, removeRecipeAction, updateRecipeAction} from "@actions/mutations/recipe.mutation";

const create = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    return wrapperAPI(() => createRecipeAction(form, req), res)
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    return wrapperAPI(() => updateRecipeAction(req.params.id, form, req), res)
}

const search = async (req: Request, res: Response): Promise<Response> => {

    // chứa keyword + category + page + limit
    const _form: ISearchRecipesOptions = transformerKey<ISearchRecipesOptions>(req.query, SearchRecipesOptionsKeys)

    return wrapperAPI(() => searchRecipeAction(_form), res)
}

const getMany = async (req: Request, res: Response): Promise<Response> => {

    let _form: ISortOptions = transformerKey<ISortOptions>(req.query, sortOptionsKeys)

    return wrapperAPI(() => manyRecipesAction(_form), res)

}

const single = async (req: Request, res: Response): Promise<Response> =>{
    return wrapperAPI(() => recipeAction(req.params.id, req), res)
}

const remove = async ({ params, user }: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => removeRecipeAction(params.id, user), res)
}

const random = async (req: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => randomRecipesAction(Number(req.query.size)), res)
}

const bookmark = async ({ params, user }: Request, res: Response): Promise<Response> => {
    const recipe = await RecipeService.getOne({ slug: params.id })
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }
    const bookmark = new BookmarkService(user!)

    // kieemr da da bookmark hay chua
    const check = await bookmark.exist(recipe)

    if(check) {
        // da ton tai => xoa
        await bookmark.delete(check._id)
        return res.status(OK).json(new ResponseSuccess(check, 'Thành công', NotifyResponse.NOTIFY))
    } else {
        const result = await bookmark.store(recipe)
        return res.status(OK).json(new ResponseSuccess(result, 'Thành công', NotifyResponse.NOTIFY))
    }
}

const getManyReviews = async ({ params, query }: Request, res: Response) => {
    const recipe = await RecipeService.getOne({ slug: params.id })
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }
    let _form: ISortOptions = transformerKey<ISortOptions>(query, sortOptionsKeys)
    let form: SortOptions = SortOptions.fromJSON(_form)

    const reviews = await ReviewService.getMany({ recipe: recipe._id }, form, [
        ReviewService.RELATIONSHIP.USER,
        ReviewService.RELATIONSHIP.RECIPE
    ])

    return res.status(OK).json(new ResponseSuccess(reviews))
}

const postReview = async ({ user, params, body }: Request, res: Response): Promise<Response> => {
    const recipe = await RecipeService.getOne({ slug: params.id })
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }

    let form: IReviewInput = {
        content: body.content,
        totalRating: body.totalRating,
        user: user!._id,
        recipe: recipe._id
    }

    const review: IReview = await ReviewService.add(form)

    // sự kiện update lại recipe
    Events.recipe.addReview(recipe, review)
    return res.status(OK).json(new ResponseSuccess(review, 'Đánh giá thành công', NotifyResponse.NOTIFY))
}

export default {
    create,
    update,
    search,
    getMany,
    single,
    remove,
    random,
    bookmark,
    getManyReviews,
    postReview
}
