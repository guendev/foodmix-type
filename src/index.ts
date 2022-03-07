import {Express, Request} from 'express'
import http, { Server } from 'http'
import { ApolloServer } from "apollo-server-express"
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'


import schema from './graphql'
import initServer from "@server";
import {userFormRequest} from "@middleware/auth.middleware";

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
                const token = option.Authorization || ''
                let user = undefined
                if (token) {
                    user = await userFormRequest(token.replace('Bearer ', ''))
                    if (user) {
                        console.log('Websocket CONNECTED with user: ' + user.id)
                    }
                }
                return {
                    user
                }
            },
            onDisconnect: () => console.log('Websocket DISCONNECTED')
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
        context({ req }) {
            return {
                req,
                user: req.user
            }
        },
        formatError(e) {

            // Todo: custom error
            // Don't give the specific errors to the client.
            if (e.message.startsWith('Database Error: ')) {
                return new Error('Internal server error');
            }
            // Otherwise, return the original error. The error can also
            // be manipulated in other ways, as long as it's returned.
            return e
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
