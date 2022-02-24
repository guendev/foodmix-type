import StatusCodes from "http-status-codes"
import {CategoryService, ICategoryInput} from "@services/category.service";
import {IWrapperResponse, WrapperError} from "@actions/wrapper";
import {ICategory} from "@models/category";
import {NotifyResponse} from "@shared/response";

const { OK, FORBIDDEN, BAD_REQUEST, NOT_FOUND } = StatusCodes

export const createCategoryAction = async (form: ICategoryInput): Promise<IWrapperResponse> => {
    const category = await CategoryService.create(form)
    return {
        data: category,
        code: NotifyResponse.NOTIFY
    }
}

export const updateCategoryAction = async (slug: String, form: ICategoryInput): Promise<IWrapperResponse> => {
    const category: ICategory|null = await CategoryService.getOne({ slug })
    if(!category) {
        throw new WrapperError({ code: NotifyResponse.NOTIFY, msg: 'Phân loại không tồn tại', status: NOT_FOUND })
    }
    const _updated = await CategoryService.update({ _id: category._id }, form)
    return {
        data: _updated,
        code: NotifyResponse.NOTIFY
    }
}
