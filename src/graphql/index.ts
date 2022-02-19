import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from "@graphql-tools/schema"

import resolvers from './resolvers'
import typeDefs from './types'


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaExtensions: []
})


export default schema
