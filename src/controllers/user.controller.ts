import {Request, Response} from 'express'
import StatusCodes from "http-status-codes"

import {IUserCreateInput, IUserSignInInput, UserService} from "@services/user.service"
import {IUser} from '@models/user'
import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response";
import {matchPassword} from "@services/password.service";
import {createToken} from "@services/token.service";

const { OK, FORBIDDEN } = StatusCodes

const signup = async (req: Request, res: Response) => {
    const form: IUserCreateInput = req.body
    const _check: IUser = await UserService.getOne({ email: form.email })
    if(_check) {
        // user đã tồn tại
        return res.status(FORBIDDEN).json(new ResponseError( 'Thành viên đã tồn tại', NotifyResponse.NOTIFY))
    }
    const user = await UserService.create(form)
    // tạo jsonwebtoken
    const _token: string = createToken({ _id: user._id, email: user.email })
    return res.status(OK).json(new ResponseSuccess(_token, 'Đăng ký thành công', NotifyResponse.NOTIFY))
}

const signin = async (req: Request, res: Response) => {
    const form: IUserSignInInput = req.body
    const user: IUser = await UserService.getOne({ email: form.email }, '')
    if(!user) {
        // user đã tồn tại
        return res.status(FORBIDDEN).json(new ResponseError( 'Email chưa được đăng ký', NotifyResponse.NOTIFY))
    }
    const _match = matchPassword(form.password, user.password)
    if(!_match) {
        return res.status(FORBIDDEN).json(new ResponseError( 'Mật khẩu không chính xác', NotifyResponse.NOTIFY))
    }
    // tạo jsonwebtoken
    const _token: string = createToken({ _id: user._id, email: user.email })
    return res.status(OK).json(new ResponseSuccess(_token, 'Đăng nhập thành công', NotifyResponse.NOTIFY))
}

const me = ({ user }: Request, res: Response): Response => {
    if(!user) {
        return res.status(FORBIDDEN).json(new ResponseError())
    }
    return res.status(OK).json(new ResponseSuccess(user))
}

export default {
    signup,
    signin,
    me
} as const
