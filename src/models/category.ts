import { Document, Schema, model } from 'mongoose'
const slug = require('mongoose-slug-generator')

export interface ICategory extends Document {
    name: string,
    slug?: string,
    avatar: string,
    content: string,
    icon: string
}

const schema = new Schema<ICategory>({
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
        default: 'https://i.imgur.com/mVqk1d3.jpg'
    },
    content: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'https://i.imgur.com/sJapZxD.png'
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

schema.plugin(slug)

export const Category = model<ICategory>('Category', schema)
