import {Request, Response} from "express";
import StatusCodes from "http-status-codes"
import * as fs from "fs"

import { NotifyResponse, ResponseError, ResponseSuccess } from "@shared/response"
import Events from '@events'
import { Resize } from "@shared/resize"

const { OK, FORBIDDEN } = StatusCodes

const single = async ({ body, file, user }: Request, res: Response) => {
    try {
        if(!file) {
            return res.status(FORBIDDEN).json(new ResponseError('Hình ảnh là bắt buộc', NotifyResponse.NOTIFY))
        }
        if(!["user-avatar"].includes(body.endpoint)) {
            Events.upload.removeFile(file.path)
            return res.status(FORBIDDEN).json(new ResponseError('Endpoint không hợp lệ', NotifyResponse.NOTIFY))
        }

        // lấy kích thước ảnh
        const CGSize = Resize.size(body.endpoint)
        // lấy tên ảnh
        const { filePath, fileName } = Resize.buildFileName(user!, body.endpoint)

        const resize = new Resize(file.path)

        // nén ảnh
        const dataJPG = await resize.resize(CGSize)

        // tạo thư mục + gi file
        fs.mkdirSync(`public${filePath}`, { recursive: true })
        await fs.writeFileSync(`public${filePath}/${fileName}`, dataJPG)

        // xoá ảnh gốc
        Events.upload.removeFile(file.path)
        return res.status(OK).json(new ResponseSuccess(filePath + '/' + fileName, 'Tải lên thành công', NotifyResponse.NOTIFY))
    } catch (_) {
        console.log(_)
        Events.upload.removeFile(file!.path)
        return res.status(FORBIDDEN).json(new ResponseError('Upload thất bại', NotifyResponse.NOTIFY))
    }

}

export default {
    single
} as const
