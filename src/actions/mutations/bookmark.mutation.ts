import StatusCodes from "http-status-codes"
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";
import {IUser} from "@models/user";
import {RecipeService} from "@services/recipe.service";
import {BookmarkService} from "@services/bookmark.service";
import {Types} from "mongoose";
import {channel, pubsub} from "@graphql/pubsub";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export const bookmarkAction = async (slug: string, user: IUser): Promise<IWrapperResponse> => {
    const recipe = await RecipeService.getOne({ slug })

    if(!recipe) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, msg: 'Món ăn không tồn tại', status: NOT_FOUND })
    }
    const bookmark = new BookmarkService(user!)

    // kieemr da da bookmark hay chua
    const check = await bookmark.exist(recipe)

    // Event update bookcounter


    if(check) {
        // da ton tai => xoa
        await bookmark.delete(check._id)

        // notify
        await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Huỷ thành công' } })
        return {
            data: null,
            msg: 'Huỷ thành công',
            code: NotifyResponse.NOTIFY
        }
    } else {
        const result = await bookmark.store(recipe)
        await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Thêm thành công' } })
        return {
            data: result,
            msg: 'Thêm thành công',
            code: NotifyResponse.NOTIFY
        }
    }
}

export const removeBookmarkAction = async (id: string, user: IUser): Promise<IWrapperResponse> => {
    const bookmark = new BookmarkService(user!)
    if(!Types.ObjectId.isValid(id)) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'ID không hợp lệ', status: BAD_REQUEST })
    }
    const _id: Types.ObjectId = new Types.ObjectId(id)
    const check = await bookmark.delete(_id)
    if(!check) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Bookmark không không tồn tại', status: NOT_FOUND })
    }
    return {
        code: NotifyResponse.NOTIFY,
        data: check,
        msg: 'Xoá thành công'
    }
}

export const deleteAllBookmarksAction = async (user: IUser): Promise<IWrapperResponse> => {
    const bookmark = new BookmarkService(user!)
    const result = await bookmark.deleteALl()

    return {
        data: result.deletedCount,
        msg: 'Xoá tất cả thành công'
    }
}
