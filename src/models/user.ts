import { Document, Schema, model } from 'mongoose'
import {hashPassword} from "@services/password.service";

const slug = require('mongoose-slug-generator')

export interface IUser extends Document {
    name: string,
    email: string,
    slug: string,
    role: string,
    avatar: string,
    banner: string,
    province: string,
    password: string,
    about: string,
    countRecipe: number,
    countRating: number,
    totalRating: number,
    createdAt: number,

    // truong ao
    rating?: number
}

export const roles: string[] = ['user','mod','admin','sp_admin']

const schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        // validate tại controller
        // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true,
        index: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/pqGLgGr.jpg'
    },
    banner: {
        type: String,
        default: '/images/theme/banner.svg'
    },
    province: {
        type: String
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String
    },
    countRecipe: {
        type: Number,
        index: true,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0,
        index: true
    },
    countRating: {
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

// Middleware
schema.pre<IUser>('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = hashPassword(this.password)
    next()
})

schema.virtual('rating').get(function (this: IUser): number {
    return this.totalRating / this.countRating
})

export const User = model<IUser>('User', schema)
