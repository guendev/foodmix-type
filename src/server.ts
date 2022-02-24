import './environment'

import express, {Express} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

import requestIp from 'request-ip'

import database from './database'
import { authMw } from "@middleware/auth.middleware"
import routes from "@routes/index"

// crosss
const whitelist: [string] = ['']
if (process.env.NODE_ENV !== 'production') {
    whitelist.push(
        ...[
            'https://studio.apollographql.com'
        ]
    )
}
const corsOptions: cors.CorsOptions = {
    origin: whitelist
}

async function initServer(): Promise<Express> {
    // chạy database
    await database.run()
    // khởi tạo express
    const app = express()
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))

    /***********************************************************************************
     *                                  Global Middleware
     **********************************************************************************/
    // lấy ip của user: req.clientIp
    app.use(requestIp.mw())
    app.use(authMw)

    /***********************************************************************************
     *                                  Router
     **********************************************************************************/
    app.use('/api', routes)

    return app
}

export default initServer
