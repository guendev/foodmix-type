import { Router } from 'express'
const router = Router()

import IRouter from "@utils/router"

import userRouter from './user'

const clientRoutersMap: [IRouter] = [
    {
        prefix: '/user',
        router: userRouter
    }
];

clientRoutersMap.forEach((e) => {
    router.use(e.prefix, e.router)
})

export default router

