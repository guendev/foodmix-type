import {Document, Schema, model, PopulatedDoc} from 'mongoose'
import {IUser} from "@models/user";
import {IRecipe} from "@models/recipe";

export interface IReview extends Document {
    user: PopulatedDoc<IUser>
    recipe: PopulatedDoc<IRecipe>
    content: string
    totalRating: number
    rating: number
    createdAt: number
}

const schema = new Schema<IReview>({
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
    content: {
        type: String,
        required: true
    },
    totalRating: {
        type: Number,
        min: 0,
        max: 5 * 5
    },
    createdAt: {
        type: Number,
        index: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

export const Review = model<IReview>('Review', schema)
