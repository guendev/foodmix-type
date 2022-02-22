import StatusCodes from "http-status-codes"

import {IUserCreateInput, IUserSignInInput, UserService} from "@services/user.service";
import {IUser} from "@models/user";
import {createToken} from "@services/token.service";
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";
import {matchPassword} from "@services/password.service";

const { OK, FORBIDDEN } = StatusCodes

export const signupAction = async (form: IUserCreateInput): Promise<IWrapperResponse> => {
    const _check: IUser = await UserService.getOne({ email: form.email })
    if(_check) {
        // user đã tồn tại
        // Todo: throw custom error
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Thành viên đã tồn tại', status: FORBIDDEN })
    }
    const user = await UserService.create(form)
    // tạo jsonwebtoken
    const _token = {
        token: createToken({ _id: user._id, email: user.email })
    }

    return {
        code: NotifyResponse.NOTIFY,
        data: _token,
        msg: "Đăng ký thành công"
    }

}

export const signinAction = async (form: IUserSignInInput): Promise<IWrapperResponse> => {
    const user: IUser = await UserService.getOne({ email: form.email }, '')
    if(!user) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Thành viên không tồn tại', status: FORBIDDEN })
    }
    const _match = matchPassword(form.password, user.password)

    if(!_match) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Mật khẩu không chính xác', status: FORBIDDEN })
    }

    // tạo jsonwebtoken
    const _token = {
        token: createToken({ _id: user._id, email: user.email })
    }

    return {
        code: NotifyResponse.NOTIFY,
        data: _token,
        msg: "Đăng ký thành công"
    }
}
