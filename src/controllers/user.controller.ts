import {Request, Response} from 'express'
import StatusCodes from "http-status-codes"

import { IUserCreateInput, IUserSignInInput } from "@services/user.service"
import { ResponseError, ResponseSuccess } from "@shared/response";
import {wrapperAPI} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";

const { OK, FORBIDDEN } = StatusCodes

const signup = async (req: Request, res: Response) => {
    const form: IUserCreateInput = req.body
    // Todo: validate form
    return wrapperAPI(() => signupAction(form), res)
}

const signin = async (req: Request, res: Response) => {
    const form: IUserSignInInput = req.body
    return wrapperAPI(() => signinAction(form), res)
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
