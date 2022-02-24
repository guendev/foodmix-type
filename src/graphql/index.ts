import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from "@graphql-tools/schema"
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive'

import resolvers from './resolvers'
import typeDefs from './types'


let schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [typeDefs, constraintDirectiveTypeDefs],
    resolvers,
    schemaExtensions: []
})

schema = constraintDirective()(schema)


export default schema
