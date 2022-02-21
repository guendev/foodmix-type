import {
    IRecipeCreateInput,
    IRecipeInput,
    IRecipeInputKeys,
    ISearchRecipesOptions,
    RecipeService,
    SearchRecipesOptions,
    SearchRecipesOptionsKeys
} from "@services/recipe.service";
import {Request, Response} from "express";
import StatusCodes from "http-status-codes";
import {IRecipe} from "@models/recipe";
import {NotifyResponse, ResponseError, ResponseSuccess} from "@utils/response";
import {ICategory} from "@models/category";
import {CategoryService} from "@services/category.service";
import transformerKey from "@shared/transformer";
import {ParamsDictionary} from "express-serve-static-core";
import {mergeModQuery} from "@shared/permission";
import {ISortOptions, SortOptions, sortOptionsKeys} from "@utils/sort";

const { OK, NOT_FOUND } = StatusCodes

const create = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Phân loại không tồn tại', NotifyResponse.NOTIFY))
    }

    const user = req.user
    const doc: IRecipeCreateInput = {...form, user: user!._id, category: category._id}
    const recipe: IRecipe = await RecipeService.create(doc)

    return res.status(OK).json(new ResponseSuccess(recipe, 'Tạo mới thành công', NotifyResponse.NOTIFY))
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const form: IRecipeInput = transformerKey<IRecipeInput>(req.body,IRecipeInputKeys)
    const param: ParamsDictionary = req.params
    const user = req.user

    const recipe: IRecipe | null = await RecipeService.getOne(mergeModQuery({ slug: param.id }, user!))
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }

    const category: ICategory|null = await CategoryService.getOne({ slug: form.category })
    if(!category) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Phân loại không tồn tại', NotifyResponse.NOTIFY))
    }

    form.category = category._id
    const _recipe = await RecipeService.update({ _id: recipe._id }, form)

    return res.status(OK).json(new ResponseSuccess(_recipe, 'Cập nhật thành công', NotifyResponse.NOTIFY))
}

const search = async (req: Request, res: Response): Promise<Response> => {

    // chứa keyword + category + page + limit
    const _form: ISearchRecipesOptions = transformerKey<ISearchRecipesOptions>(req.query, SearchRecipesOptionsKeys)
    if(_form.category) {
        const category: ICategory|null = await CategoryService.getOne({ slug: _form.category })
        if(category) {
            _form.category = category._id
        } else {
            _form.category = undefined
        }
    }

    const form = new SearchRecipesOptions(_form)

    const recipes: IRecipe[] = await RecipeService.search(form)

    return res.status(OK).json(new ResponseSuccess(recipes, 'Cập nhật thành công', NotifyResponse.NOTIFY))
}

const getMany = async (req: Request, res: Response): Promise<Response> => {

    let _form: ISortOptions = transformerKey<ISortOptions>(req.query, sortOptionsKeys)
    let form: SortOptions = SortOptions.fromJSON(_form)

    const recipes: IRecipe[] = await RecipeService.getMany({}, form)

    return res.status(OK).json(new ResponseSuccess(recipes))

}

const single = async (req: Request, res: Response): Promise<Response> =>{
    const params: ParamsDictionary = req.params
    const recipe = await RecipeService.getOne({ slug: params.id })
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.HIDDEN))
    }
    return res.status(OK).json(new ResponseSuccess(recipe))
}

const remove = async ({ params, user }: Request, res: Response): Promise<Response> => {
    const recipe = await RecipeService.delete(mergeModQuery({ slug: params.id }, user!))
    if(!recipe) {
        return res.status(NOT_FOUND).json(new ResponseError( 'Công thức không tồn tại', NotifyResponse.NOTIFY))
    }
    return res.status(OK).json(new ResponseSuccess(recipe, 'Xoá thành công', NotifyResponse.NOTIFY))
}

export default {
    create,
    update,
    search,
    getMany,
    single,
    remove
}
