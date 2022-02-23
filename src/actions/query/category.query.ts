import {CategoryService} from "@services/category.service";
import {IWrapperResponse} from "@actions/wrapper";

export const allCategoryAction = async (): Promise<IWrapperResponse> => {
    const categories = await CategoryService.getAll()
    return {
        data: categories
    }
}
