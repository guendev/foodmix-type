import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import {IUser} from "@models/user";
import StatusCodes from "http-status-codes"
import {NotifyResponse} from "@shared/response";
import {ISortOptions, SortOptions} from "@shared/sort";
import {UserService} from "@services/user.service";

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

