import {IRecipe, Recipe} from "@models/recipe";
import {SortOptions} from "@utils/sort";
import {Types} from "mongoose";

class RecipeService {
    constructor() {}

    static async getOne(filter: object): Promise<IRecipe|null> {
        return Recipe.findOne(filter).lean<IRecipe>();
    }

    static async getMany(filter: object, sortOptions: SortOptions): Promise<IRecipe[]> {
        return Recipe.find(filter)
            .sort(sortOptions.sortFilter)
            .skip(sortOptions.skip)
            .limit(sortOptions.limit)
            .lean<IRecipe[]>()
    }

    static async count(filter: object): Promise<number> {
        return Recipe.find(filter).countDocuments()
    }

    static async create(doc: IRecipeCreateInput): Promise<IRecipe> {
        return Recipe.create({ ...doc, createdAt: Date.now() })
    }

    static async update(filter: object, doc: IRecipeInput): Promise<IRecipe|null> {
        return Recipe.findOneAndUpdate(filter, doc, { returnOriginal: false })
    }
}

interface IIngredient {
    name: string,
    count: number,
    unit: string
}

interface IStepper {
    content: string,
    image: string
}

interface IRecipeCreateInput extends IRecipeInput{
    user: Types.ObjectId
}

interface IRecipeInput {
    name: string,
    avatar: string,
    content: string,
    category: Types.ObjectId,
    ingredients: IIngredient[],
    stepper: IStepper[],
    time: string,
    preparation: string
}

export {
    RecipeService,
    IIngredient,
    IStepper,
    IRecipeInput,
    IRecipeCreateInput
}
