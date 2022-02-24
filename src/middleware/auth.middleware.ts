import {NextFunction, Request, Response} from "express";
import { readUser } from "@services/token.service";
import {IUser} from "@models/user";

const authMw = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.user = await userFormRequest(req)
    next()
}


const userFormRequest = async (req: Request): Promise<IUser|undefined> => {
    const token = req.headers.authorization || ''
    if (token) {
        return readUser(token.replace('Bearer ', ''))
    }
}

export {
    authMw,
    userFormRequest
}
