import {NextFunction, Request, Response} from "express"
const { UNAUTHORIZED } = StatusCodes

import {ResponseError} from "@utils/response"
import StatusCodes from "http-status-codes";

const permission = (permissions: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(UNAUTHORIZED).json(new ResponseError(2, 'Bạn cần đăng nhập'))
    }
    if (!['sp_admin', ...permissions].includes(req.user.role)) {
        return res.status(UNAUTHORIZED).json(new ResponseError(2, 'Bạn không đủ quyền'))
    }
    next()
}

export default permission
