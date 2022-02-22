import {Document, model, PopulatedDoc, Schema} from "mongoose"
import {IUser} from "@models/user"
import {IRecipe} from "@models/recipe"

export interface IHistory extends Document {
    user: PopulatedDoc<IUser>
    recipe: PopulatedDoc<IRecipe>
    createdAt: number
}

const schema = new Schema<IHistory>({
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

export const History = model<IHistory>('History', schema)
