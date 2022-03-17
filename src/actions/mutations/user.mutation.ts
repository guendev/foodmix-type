import StatusCodes from "http-status-codes"

import {
    IUserCreateInput,
    IUserSignInInput,
    IUserUpdateInput,
    IUserUpdatePasswordInput,
    UserService
} from "@services/user.service"
import {IUser} from "@models/user";
import {createToken} from "@services/token.service"
import {IWrapperResponse, WrapperError} from "@actions/wrapper"
import {NotifyResponse} from "@shared/response"
import {hashPassword, matchPassword} from "@services/password.service"
import {channel, pubsub} from "@graphql/pubsub";

const { OK, FORBIDDEN, BAD_REQUEST } = StatusCodes

export const signupAction = async (form: IUserCreateInput): Promise<IWrapperResponse> => {
    const _check = await UserService.getOne({ email: form.email })
    if(_check) {
        // user đã tồn tại
        // Todo: throw custom error
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Thành viên đã tồn tại', status: BAD_REQUEST })
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
    const user = await UserService.getOne({ email: form.email }, '')
    if(!user) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Thành viên không tồn tại', status: BAD_REQUEST })
    }
    const _match = matchPassword(form.password, user.password)

    if(!_match) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Mật khẩu không chính xác', status: BAD_REQUEST })
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

export const updateUserAction = async (form: IUserUpdateInput, user: IUser): Promise<IWrapperResponse> => {
    const updated = await UserService.update({ _id: user._id }, form)

    await Promise.all([
        pubsub.publish(channel.NOTIFY, { subNotify: { user: updated, msg: 'Cập nhật thành công' } }),
        pubsub.publish(channel.ACCOUNT, { subAccount: updated })
    ])

    return {
        code: NotifyResponse.NOTIFY,
        data: updated,
        msg: 'Cập nhật thành công'
    }
}

export const updateUserPasswordAction = async (form: IUserUpdatePasswordInput, user: IUser) => {

    const _match = matchPassword(form.currentPassword, user.password)
    if(!_match) {

        await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Mật khẩu không đúng', error: true } })

        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Mật khẩu không chính xác', status: BAD_REQUEST })
    }

    if (form.newPassword.length < 6) {
        await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Mật khẩu trên 6 ký tự', error: true } })

        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Mật khẩu trên 6 ký tự', status: BAD_REQUEST })
    }

    const updated = await UserService.updatePassword({ _id: user._id }, hashPassword(form.newPassword))

    await pubsub.publish(channel.NOTIFY, { subNotify: { user: user, msg: 'Cập nhật thành công' } })

    return {
        code: NotifyResponse.NOTIFY,
        data: updated,
        msg: 'Cập nhật thành công'
    }

}
