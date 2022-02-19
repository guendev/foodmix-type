export interface IResponseJson {
    code: number;
    data: any,
    msg?: string
}

export class ResponseSuccess implements IResponseJson {
    code: number;
    data: any;
    msg?: string;

    constructor(data: any, msg: string) {
        this.code = 200
        this.data = data
        this.msg = msg
        return this
    }
}

export class ResponseError implements IResponseJson {
    code: number;
    data: any;
    msg?: string;

    constructor(code: number, msg: string) {
        this.code = code || 403
        this.data = ''
        this.msg = msg
        return this
    }
}
