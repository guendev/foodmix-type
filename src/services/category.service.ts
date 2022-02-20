import { Category, ICategory } from "@models/category";

class CategoryService {
    constructor() {}

    static async getOne(filter: object): Promise<ICategory|null> {
        return Category.findOne(filter).lean<ICategory>()
    }

    static async getAll(): Promise<ICategory[]> {
        return Category.find().lean<ICategory[]>()
    }

    static async create(category: ICategoryInput): Promise<ICategory|null> {
        return Category.create(category)
    }

    static async update(filter: object, category: ICategoryInput): Promise<ICategory|null> {
        return Category.findOneAndUpdate(filter, category, { returnOriginal: false }).lean<ICategory>()
    }

    static async delete(filter: object): Promise<ICategory|null> {
        return Category.findOneAndDelete(filter)
    }
}

interface ICategoryInput {
    name: string,
    avatar: string,
    content: string
}

export {
    CategoryService,
    ICategoryInput
}