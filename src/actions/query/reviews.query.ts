import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import StatusCodes from "http-status-codes"
import {NotifyResponse} from "@shared/response";
import {ISortOptions, SortOptions} from "@shared/sort";
import {RecipeService} from "@services/recipe.service";
import {ReviewService} from "@services/review.service";

const { OK, UNAUTHORIZED, NOT_FOUND } = StatusCodes

export const manyReviewsActions = async (slug: string, _form: ISortOptions): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }

    let form: SortOptions = SortOptions.fromJSON(_form)

    const reviews = await ReviewService.getMany({ recipe: recipe._id }, form, [
        ReviewService.RELATIONSHIP.USER,
        ReviewService.RELATIONSHIP.RECIPE
    ])

    return {
        data: reviews
    }
}

