import {Express, Request} from 'express'
import http, { Server } from 'http'
import { ApolloServer } from "apollo-server-express"
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'


import schema from './graphql'
import initServer from "@server";

async function startApolloServer() : Promise<void> {

    const app: Express = await initServer()

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
