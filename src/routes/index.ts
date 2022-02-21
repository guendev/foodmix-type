import { Router } from 'express'
const router = Router()

import IRouter from "@utils/router"

import userRouter from './users'
import categoriesRouter from './categories'
import recipesRouter from './recipes'
import uploadRouter from "@routes/upload"
import bookmarkRouter from "@routes/bookmark"

const clientRoutersMap: IRouter[] = [
    {
        prefix: '/users',
        router: userRouter
    },
    {
        prefix: '/categories',
        router: categoriesRouter
    },
    {
        prefix: '/recipes',
        router: recipesRouter
    },
    {
        prefix: '/upload',
        router: uploadRouter
    },
    {
        prefix: '/bookmarks',
        router: bookmarkRouter
    }
];

clientRoutersMap.forEach((e) => {
    router.use(e.prefix, e.router)
})

export default router

