import {Request, Response} from 'express'
import StatusCodes from "http-status-codes"

import { IUserCreateInput, IUserSignInInput } from "@services/user.service"
import {wrapperAPI} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";
import {meAction} from "@actions/query/user.query";


const signup = async (req: Request, res: Response) => {
    const form: IUserCreateInput = req.body
    // Todo: validate form
    return wrapperAPI(() => signupAction(form), res)
}

const signin = async (req: Request, res: Response) => {
    const form: IUserSignInInput = req.body
    return wrapperAPI(() => signinAction(form), res)
}

const me = async ({user}: Request, res: Response): Promise<Response> => {
    return wrapperAPI(() => meAction(user), res)
}

export default {
    signup,
    signin,
    me
} as const
