import {NextFunction, Request, Response} from "express"
import {NotifyResponse, ResponseError} from "@utils/response"
import StatusCodes from "http-status-codes";

const { UNAUTHORIZED } = StatusCodes

const permission = (permissions: string[]|string) => (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(UNAUTHORIZED).json(new ResponseError('Bạn cần đăng nhập', NotifyResponse.HIDDEN))
    }
    if(permissions === '*') {
        return next()
    }
    if (!['sp_admin', ...permissions].includes(req.user.role)) {
        return res.status(UNAUTHORIZED).json(new ResponseError( 'Bạn không đủ quyền', NotifyResponse.HIDDEN))
    }
    next()
}

export default permission
