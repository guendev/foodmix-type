import { mergeResolvers } from '@graphql-tools/merge'

import userResolver from './user.resolvers'
import categoryResolver from "@graphql/resolvers/category.resolvers";

const resolvers = mergeResolvers([userResolver, categoryResolver])

export default resolvers
