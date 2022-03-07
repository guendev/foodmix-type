import {NotifyResponse, ResponseError, ResponseSuccess} from "@shared/response"
import {Response} from "express"
import StatusCodes from "http-status-codes"
import {ApolloError, ForbiddenError, AuthenticationError} from "apollo-server-express"

const { OK, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, BAD_REQUEST } = StatusCodes

// Bị cấm/ko đủ quyền,...FORBIDDEN
// Không tìm thấy nội dung...NOT_FOUND
// Lo xác thực được, đăng nhập...UNAUTHORIZED
// Lỗi form...BAD_REQUEST

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


type WrapperCallback = (data: IWrapperResponse, success: boolean) => (void | Promise<void>)
type WrapperAction = () => (Promise<IWrapperResponse> | IWrapperResponse)

export const wrapperAPI = async (action: WrapperAction, res: Response, callback?: WrapperCallback ) => {
    try {

        const { data, code, msg }: IWrapperResponse = await action()
        await callback?.({ data, code, msg }, true)
        return res.status(OK).json(new ResponseSuccess(data, msg, code))

    } catch (e) {

        if(e.options) {
            const { status, msg, code }: IWrapperResponse = e.options
            await callback?.(e.options, false)
            return res.status(status || FORBIDDEN).json(new ResponseError(msg, code))
        }
        return res.status(FORBIDDEN).json(new ResponseError())

    }
}

export const wrapperGraphql = async <T>(action: WrapperAction, callback?: WrapperCallback): Promise<T|Error> => {
  try {

      const { data, code, msg }: IWrapperResponse = await action()
      await callback?.({ data, code, msg }, true)
      return data as T

  } catch (e) {
      /**
       * Nếu kiểm tra object không có IWrapperResponse => Lỗi hệ thống, database,...=> EMPTY
       * Nếu status = 401 || UNAUTHORIZED => yêu cầu đăng nhập / vv
       * Nếu không tìm thấy dữ liệu...=> 404 => NOT_FOUND
       * Nếu code trả về là NOTIFY và có mesage => trả về NOTIFY
       * Còn lại trả về empty
       */
      if(e.options) {
          const { status, msg, code }: IWrapperResponse = e.options

          if(status === FORBIDDEN) {
              // Lỗi mà không có message
              throw new ForbiddenError('Yêu cầu không hợp lệ')
          }

          // Lỗi đăng nhập
          if(status === UNAUTHORIZED) {
              throw new AuthenticationError(msg!)
          }

          if(status === NOT_FOUND) {
              throw new ApolloError(msg!, 'NOT_FOUND')
          }

          if(code === NotifyResponse.NOTIFY && msg) {
              throw new ApolloError(msg, 'NOTIFY')
          }

          throw new ApolloError(msg!, 'EMPTY')
      }
      throw new ApolloError('Yêu cầu không hợp lệ', 'EMPTY')
  }
}
