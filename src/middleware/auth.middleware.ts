import {NextFunction, Request, Response} from "express";
import { readUser } from "@services/token.service";

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization || ''
    if (token) {
        req.user = await readUser(token.replace('Bearer ', ''))
    }
    next()
}
export default auth
