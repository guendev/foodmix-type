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

    static async search(sortOptions: SearchRecipesOptions): Promise<IRecipe[]> {
        return Recipe.find(sortOptions.filter)
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

const IRecipeInputKeys: string[] = ["name", "avatar", "content", "category", "ingredients", "stepper", "time", "preparation"]

interface IRecipeCreateInput extends IRecipeInput{
    user: Types.ObjectId
}

class SearchRecipesOptions extends SortOptions {
    keyword?: string
    category?: string

    constructor({ keyword, category, page, limit }: { keyword?: string, category?: string, page: number, limit: number }) {
        super({}, page, limit);
        this.keyword = keyword
        this.category = category
    }

    public get filter(): object {
        return {
            name: {
                $regex: this.keyword,
                $options: 'i'
            },
            category: this.category || { $exists: true }
        }
    }
}

const SearchRecipesOptionsKeys = ["keyword", "category", "page", "limit"]

export {
    RecipeService,
    IIngredient,
    IStepper,
    IRecipeInput,
    IRecipeCreateInput,
    IRecipeInputKeys,
    SearchRecipesOptions,
    SearchRecipesOptionsKeys
}
