import {IRecipe, Recipe} from "@models/recipe";
import {SortOptions} from "@shared/sort";
import {Types} from "mongoose";
import {User} from "@models/user";
import {Category} from "@models/category";
import {IRelationship} from "@shared/relationship";

class RecipeService {
    constructor() {}

    static async getOne(filter: object, populates: IRelationship[] = []): Promise<IRecipe|null> {
        return Recipe.findOne(filter)
            .populate(populates)
    }

    static async getMany(filter: object, sortOptions: SortOptions, populates: IRelationship[] = []): Promise<IRecipe[]> {
        return Recipe.find(filter)
            .populate(populates)
            .sort(sortOptions.sortFilter)
            .skip(sortOptions.skip)
            .limit(sortOptions.limitFilter)
    }

    static async search(sortOptions: SearchRecipesOptions, populates: IRelationship[] = []): Promise<IRecipe[]> {
        return Recipe.find(sortOptions.filter)
            .populate(populates)
            .skip(sortOptions.skip)
            .limit(sortOptions.limit)
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

    static async delete(filter: object): Promise<IRecipe|null> {
        return Recipe.findOneAndDelete(filter)
    }

    static async random(size?: number) {
        return Recipe.aggregate([
            { $sample: { size: size || 10 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }
        ])
    }

    static get RELATIONSHIP() {
        return {
            USER: {
                model: User,
                path: 'user'
            },
            CATEGORY: {
                model: Category,
                path: 'category'
            }
        }
    }
}

interface IIngredient {
    name: string,
    count: number,
    unit: string
}

interface IStepper {
    name: string,
    content: string,
    image?: string
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

interface ISearchRecipesOptions {
    keyword?: string;
    category?: string;
    page: number;
    limit: number;
}

class SearchRecipesOptions extends SortOptions {
    keyword?: string
    category?: string

    constructor({ keyword, category, page, limit }: ISearchRecipesOptions) {
        super({ sort: {}, page, limit })
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
    SearchRecipesOptionsKeys,
    ISearchRecipesOptions
}
