import { Router } from 'express'
const router = Router()

import IRouter from "@utils/router"

import userRouter from './users'
import categoriesRouter from './categories'

const clientRoutersMap: IRouter[] = [
    {
        prefix: '/users',
        router: userRouter
    },
    {
        prefix: '/categories',
        router: categoriesRouter
    }
];

clientRoutersMap.forEach((e) => {
    router.use(e.prefix, e.router)
})

export default router

