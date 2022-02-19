import { validationResult, Result } from "express-validator";
import {NextFunction, Request, Response} from "express"
import StatusCodes from "http-status-codes";
import {ResponseError} from "@utils/response";

const { FORBIDDEN } = StatusCodes

export const validator = (req: Request, res: Response, next: NextFunction) => {
    const result: Result = validationResult(req)
    if(result.isEmpty()) {
        return next()
    }
    return res.status(FORBIDDEN).json(new ResponseError(FORBIDDEN, result.array({ onlyFirstError: true })[0].msg))
}
