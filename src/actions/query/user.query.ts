import StatusCodes from "http-status-codes"

import {IUserCreateInput, UserService} from "@services/user.service";
import {IUser} from "@models/user";
import {createToken} from "@services/token.service";
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {NotifyResponse} from "@shared/response";

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
    const _token: string = createToken({ _id: user._id, email: user.email })

    return {
        code: NotifyResponse.NOTIFY,
        data: _token,
        msg: "Đăng ký thành công"
    }

}
