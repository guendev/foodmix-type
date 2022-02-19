import * as JWT from "jsonwebtoken"
import { Types } from "mongoose";

export const createToken = (options: ICreateTokenOptions) => {
    return JWT.sign(options, process.env.SECRET!, {
        expiresIn: '7d'
    })
}

export interface ICreateTokenOptions {
    _id: Types.ObjectId,
    email: string
}
