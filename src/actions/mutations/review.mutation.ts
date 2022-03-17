import StatusCodes from "http-status-codes"
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";
import {RecipeService} from "@services/recipe.service";
import {IReviewInput, ReviewService} from "@services/review.service";
import {IReview} from "@models/review";
import Events from "@events";
import { IUser } from "@models/user";
import {channel, pubsub} from "@graphql/pubsub";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export interface IReviewInputAction {
    // user: Types.ObjectId
    content: string
    totalRating: number
}

export const postReviewAction = async (slug: string, user: IUser, _form: IReviewInputAction): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }

    const form: IReviewInput = {..._form, recipe: recipe._id, user: user._id}

    const review: IReview = await ReviewService.add(form)

    const newReview = Object.assign({}, review.toObject(), { user: user.toObject() }, { recipe: recipe.toObject() })

    // sự kiện update lại recipe
    Events.recipe.addReview(recipe, newReview as IReview)

    // real time notify
    await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Đánh giá thành công' } })


    return {
        data: newReview,
        msg: 'Đánh giá thành công',
        code: NotifyResponse.NOTIFY
    }
}
