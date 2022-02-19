import './pre-start'; // import env

import express, { Request } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http, { Server } from 'http'

import { ApolloServer } from "apollo-server-express"
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'


import schema from './graphql'
import database from './database'
import routes from "./routes";


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

async function startApolloServer() : Promise<void> {
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

    /***********************************************************************************
     *                                  Router
     **********************************************************************************/
    app.use('/api', routes)


    /***********************************************************************************
     *                                  HTTP Server
     **********************************************************************************/
    let httpServer: Server = http.createServer(app)

    // Real time support
    const subscriptionServer: SubscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect: async (option: Request, webSocket: any) => {
                // middleware
            },
            onDisconnect: () => console.log('Websocket CONNECTED')
        },
        { server: httpServer, path: '/graphql' }
    )

    const server: ApolloServer = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ],
        async context() {
            return {}
        },
        debug: true
    })


    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen(process.env.PORT, () =>
        console.log(`Server ready at /graphql`)
    )
}
startApolloServer().then()
