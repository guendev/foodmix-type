import StatusCodes from "http-status-codes"
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse, ResponseSuccess} from "@shared/response";
import {IUser} from "@models/user";
import {RecipeService} from "@services/recipe.service";
import {BookmarkService} from "@services/bookmark.service";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export const bookmarkAction = async (slug: string, user: IUser): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }
    const bookmark = new BookmarkService(user!)

    // kieemr da da bookmark hay chua
    const check = await bookmark.exist(recipe)

    if(check) {
        // da ton tai => xoa
        await bookmark.delete(check._id)
        return {
            data: check,
            msg: 'Huỷ thành công',
            code: NotifyResponse.NOTIFY
        }
    } else {
        const result = await bookmark.store(recipe)
        return {
            data: result,
            msg: 'Thêm thành công',
            code: NotifyResponse.NOTIFY
        }
    }
}
