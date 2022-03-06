import * as express from "express"
import { IUser } from '@models/user'

declare global {
    namespace Express {
        interface Request {
            user? : IUser
            Authorization?: String
        }
    }
}
