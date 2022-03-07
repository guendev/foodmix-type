import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import {IUser} from "@models/user";
import StatusCodes from "http-status-codes"
import {NotifyResponse} from "@shared/response";

const { OK, UNAUTHORIZED } = StatusCodes

export const meAction = (user?: IUser): IWrapperResponse => {
    if(!user) {
        throw new WrapperError({ code: NotifyResponse.HIDDEN, status: UNAUTHORIZED, msg: 'Hiện không đăng nhập' })
    }
  return {
      data: user
  }
}

