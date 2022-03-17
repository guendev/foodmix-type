import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import {IUser} from "@models/user";
import StatusCodes from "http-status-codes"
import {NotifyResponse} from "@shared/response";
import {ISortOptions, SortOptions} from "@shared/sort";
import {UserService} from "@services/user.service";
import {RecipeService} from "@services/recipe.service";
import {ReviewService} from "@services/review.service";

const { OK, UNAUTHORIZED, NOT_FOUND } = StatusCodes

export const meAction = (user?: IUser): IWrapperResponse => {
    if(!user) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, status: UNAUTHORIZED, msg: 'Hiện không đăng nhập' })
    }
  return {
      data: user
  }
}

export const getUsersAction = async (filter: ISortOptions): Promise<IWrapperResponse> => {
    let form: SortOptions = SortOptions.fromJSON(filter)

    const users = await UserService.getMany({}, form)

    return {
        data: users
    }
}

export const getProfileAction = async (slug: String): Promise<IWrapperResponse> => {
    let profile = await UserService.getOne({ slug })
    if(!profile) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, status: NOT_FOUND, msg: 'Thành viên không tồn tại' })
    }
    return {
        data: profile
    }
}

export const getRecipesProfileAction = async (id: string, filter: ISortOptions): Promise<IWrapperResponse> => {
    let profile = await UserService.getOne({ slug: id })
    if(!profile) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, status: NOT_FOUND, msg: 'Thành viên không tồn tại' })
    }

    let form: SortOptions = SortOptions.fromJSON(filter)

    const recipes = await RecipeService.getMany({ user: profile._id }, form, [RecipeService.RELATIONSHIP.CATEGORY, RecipeService.RELATIONSHIP.USER])

    return {
        data: recipes
    }
}

export const getReviewsprofileAction = async (id: string, filter: ISortOptions): Promise<IWrapperResponse> => {
    let profile = await UserService.getOne({ slug: id })
    if(!profile) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, status: NOT_FOUND, msg: 'Thành viên không tồn tại' })
    }

    let form: SortOptions = SortOptions.fromJSON(filter)

    const reviews = await ReviewService.getMany({ user: profile._id }, form, [ ReviewService.RELATIONSHIP.RECIPE, ReviewService.RELATIONSHIP.USER ])

    return {
        data: reviews
    }
}

