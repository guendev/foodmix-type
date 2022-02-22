import * as JWT from "jsonwebtoken"
import {JwtPayload} from "jsonwebtoken"
import {Types} from "mongoose";
import {IUser} from "@models/user";
import {UserService} from "@services/user.service";

export const createToken = (options: ICreateTokenOptions): string => {
    return JWT.sign(options, process.env.SECRET!, {
        expiresIn: '7d'
    })
}

type JWTPayload = JwtPayload | string | null;

export const readToken = (token: string): JWTPayload => {
    try {
        return JWT.verify(token, process.env.SECRET!)
    } catch (e) {
        return null
    }
}

export const readUser = async (token: string): Promise<IUser | undefined> => {
    try {
        const jwtPayload: JWTPayload = readToken(token)
        if (jwtPayload) {
            return await UserService.getOne({ email: (jwtPayload as IUser).email })
        }
    } catch (_) {
        return undefined
    }
}

export interface ICreateTokenOptions {
    _id: Types.ObjectId,
    email: string
}
