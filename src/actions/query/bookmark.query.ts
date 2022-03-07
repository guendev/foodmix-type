import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import {IUser} from "@models/user";
import {ISortOptions, SortOptions} from "@shared/sort";
import {BookmarkService} from "@services/bookmark.service";
import {RecipeService} from "@services/recipe.service";
import {NotifyResponse} from "@shared/response";
import StatusCodes from "http-status-codes";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes


export const manyBookmarksAction = async (user: IUser, _form: ISortOptions): Promise<IWrapperResponse> => {
    const options: SortOptions = SortOptions.fromJSON(_form)
    const bookmark = new BookmarkService(user)
    const histories = await bookmark.getMany(options)

    return {
        data: histories
    }
}

export const checkBookmarkAction = async (user: IUser, slug: string): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })
    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }

    const bookmark = new BookmarkService(user)

    const check = await bookmark.exist(recipe)

    return {
        data: check
    }
}

