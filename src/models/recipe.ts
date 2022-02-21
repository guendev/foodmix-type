import { Document, Schema, model, Types, PopulatedDoc } from 'mongoose'
import {ICategory} from "@models/category";
import {IUser} from "@models/user";
import {IIngredient, IStepper} from "@services/recipe.service";

const slug = require('mongoose-slug-generator')

export interface IRecipe extends Document {
    name: string
    slug: string
    avatar: string
    content: string
    category: PopulatedDoc<ICategory>
    user: PopulatedDoc<IUser>
    ingredients: IIngredientDocument[]
    stepper: IStepperDocument[]
    time: string
    preparation: string
    countRating: number
    totalRating: number
    views: number
    createdAt: number
}

export interface IIngredientDocument extends Document, IIngredient {}

export interface IStepperDocument extends Document, IStepper {}

const schema = new Schema<IRecipe>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true,
        index: true
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/pqGLgGr.jpg'
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: Types.ObjectId,
        required: true,
        index: true
    },
    user: {
        type: Types.ObjectId,
        required: true,
        index: true,
        immutable: true
    },
    ingredients: {
        type: [
            {
                name: String,
                count: Number,
                unit: String,
                _id: false
            }
        ],
        default: []
    },
    stepper: {
        type: [
            {
                content: String,
                image: String,
                _id: false
            }
        ],
        default: []
    },
    time: {
        type: String,
        index: true,
        required: true
    },
    preparation: {
        type: String,
        index: true,
        required: true
    },
    views: {
        type: Number,
        default: 0,
        index: true
    },
    countRating: {
        type: Number,
        default: 0,
        index: true
    },
    totalRating: {
        type: Number,
        default: 0,
        index: true
    },
    createdAt: {
        type: Number,
        default: Date.now(),
        index: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

schema.plugin(slug)

export const Recipe = model<IRecipe>('Recipe', schema)
