import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response"
import {Response} from "express"
import StatusCodes from "http-status-codes"

const { OK, FORBIDDEN } = StatusCodes

export interface IWrapperResponse {
    code?: NotifyResponse;
    data?: any,
    msg?: string,
    status?: number
}

export class WrapperError extends Error {
    options: IWrapperResponse
    constructor(options: IWrapperResponse) {
        super('Error wrapper action')
        this.options = options
    }
}


type WrapperCallback = (data: IWrapperResponse) => (void | Promise<void>)
type WrapperAction = () => (Promise<IWrapperResponse> | IWrapperResponse)

export const wrapperAPI = async (action: WrapperAction, res: Response, callback?: WrapperCallback ) => {
    try {
        const { data, code, msg }: IWrapperResponse = await action()
        await callback?.({ data, code, msg })
        return res.status(OK).json(new ResponseSuccess(data, msg, code))
    } catch (e) {
        if(e.options) {
            const { status, msg, code }: IWrapperResponse = e.options
            await callback?.(e.options)
            return res.status(status || FORBIDDEN).json(new ResponseError(msg, code))
        }
        return res.status(FORBIDDEN).json(new ResponseError())
    }
}
