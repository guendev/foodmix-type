import {NextFunction, Request, Response} from "express";
import { readUser } from "@services/token.service";
import {IUser} from "@models/user";

const authMw = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.user = await userFormRequest(req.headers.authorization || '')
    next()
}


const userFormRequest = async (token: String): Promise<IUser|undefined> => {
    if (token) {
        return readUser(token.replace('Bearer ', ''))
    }
}

export {
    authMw,
    userFormRequest
}
