export interface IResponseJson {
    code: NotifyResponse;
    data: any,
    msg?: string
}

export class ResponseSuccess implements IResponseJson {
    code: NotifyResponse;
    data: any;
    msg?: string;

    constructor(data: any, msg?: string, code?: NotifyResponse) {
        this.code = code || NotifyResponse.HIDDEN
        this.data = data
        this.msg = msg || 'Thành công'
        return this
    }
}

export class ResponseError implements IResponseJson {
    code: NotifyResponse;
    data: any;
    msg?: string;

    constructor(msg?: string, code?: NotifyResponse) {
        this.code = code || NotifyResponse.HIDDEN
        this.data = ''
        this.msg = msg || 'Thất bại'
        return this
    }
}

export enum NotifyResponse {
    HIDDEN,
    NOTIFY
}
