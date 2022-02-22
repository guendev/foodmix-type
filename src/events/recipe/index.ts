import events from 'events'
import { Request } from "express"

const eventEmitter = new events.EventEmitter()
import {IRecipe} from "@models/recipe"


import listen from './listener'
import {IReview} from "@models/review";

const viewRecipe = (recipe: IRecipe, req: Request) => {
    eventEmitter.once('VIEW_RECIPE', listen.view)
    eventEmitter.emit('VIEW_RECIPE', recipe, req)
}

const addReview = (recipe: IRecipe, review: IReview) => {
    eventEmitter.once('REVIEW_RECIPE', listen.rate)
    eventEmitter.emit('REVIEW_RECIPE', recipe, review)
}

export default {
    viewRecipe,
    addReview
}
