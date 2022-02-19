import { Router } from 'express'
const router = Router()

import IRouter from "@utils/router"
import clientRouter from '@routes/client'

const routersMap: [IRouter] = [
    {
        prefix: '/client',
        router: clientRouter
    }
];

routersMap.forEach((e) => {
    router.use(e.prefix, e.router)
})

export default router

