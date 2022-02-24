import StatusCodes from "http-status-codes"
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";
import {RecipeService} from "@services/recipe.service";
import {IReviewInput, ReviewService} from "@services/review.service";
import {IReview} from "@models/review";
import Events from "@events";
import {Types} from "mongoose";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export interface IReviewInputAction {
    user: Types.ObjectId
    content: string
    totalRating: number
}

export const postReviewAction = async (slug: string, _form: IReviewInputAction): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }

    const form: IReviewInput = {..._form, recipe: recipe._id}

    const review: IReview = await ReviewService.add(form)

    // sự kiện update lại recipe
    Events.recipe.addReview(recipe, review)

    return {
        data: review,
        msg: 'Đánh giá thành công',
        code: NotifyResponse.NOTIFY
    }
}
