import events from 'events'
import { Request } from "express"

const eventEmitter = new events.EventEmitter()
import {IRecipe} from "@models/recipe"


import listen from './listener'

const viewRecipe = (recipe: IRecipe, req: Request) => {
    eventEmitter.once('VIEW_RECIPE', listen.view)
    eventEmitter.emit('VIEW_RECIPE', recipe, req)
}

export default {
    viewRecipe
}
