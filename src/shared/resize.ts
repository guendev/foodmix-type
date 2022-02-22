import sharp from 'sharp'
import { randomUUID } from 'crypto'

import {IUser} from "@models/user";

class Resize {
    image: any

    constructor(image: any) {
        this.image = image
    }

    async resize({ width, height }: ISizeImage) {
        return sharp(this.image).jpeg({}).resize(width, height, { fit: 'cover' }).toBuffer()
    }

    // Todo: resizeWithWater

    static size(path: string): ISizeImage {
        let CGSize: ISizeImage = { width: 0, height: 0 }
        switch (path) {
            case 'avatar':
                CGSize.width = 100
                CGSize.height = 100
                break
            case 'banner':
                CGSize.width = 720
                CGSize.height = 280
                break
            case 'recipe':
                CGSize.width = 600
                CGSize.height = 320
                break
            case 'stepper':
                CGSize.width = 600
                CGSize.height = 320
                break
            case 'category':
                CGSize.width = 600
                CGSize.height = 320
                break
            default:
                CGSize.width = 100
                CGSize.height = 100
        }
        return CGSize
    }

    static buildFileName(user: IUser, path: string) {
        let filePath = `/images/users/${user._id}/${path}`
        let fileName = `${randomUUID()}.jpg`
        return { filePath, fileName }
    }
}

interface ISizeImage {
    width: number
    height: number
}

export {
    Resize,
    ISizeImage
}
