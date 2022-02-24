import { IWrapperResponse } from "@actions/wrapper"
import {IUser} from "@models/user";
import {ISortOptions, SortOptions} from "@shared/sort";
import {BookmarkService} from "@services/bookmark.service";


export const manyBookmarksAction = async (user: IUser, _form: ISortOptions): Promise<IWrapperResponse> => {
    const options: SortOptions = SortOptions.fromJSON(_form)
    const bookmark = new BookmarkService(user!)
    const histories = await bookmark.getMany(options)

    return {
        data: histories
    }
}

