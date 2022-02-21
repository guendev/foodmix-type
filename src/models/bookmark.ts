import { Document, Schema, model, PopulatedDoc } from 'mongoose'
import {IUser} from "@models/user";
import {IRecipe} from "@models/recipe";

export interface IBookmark extends Document {
    user: PopulatedDoc<IUser>
    recipe: PopulatedDoc<IRecipe>
    createdAt: number
}

const schema = new Schema<IBookmark>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    createdAt: {
        type: Number,
        index: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

export const Bookmark = model<IBookmark>('Bookmark', schema)
