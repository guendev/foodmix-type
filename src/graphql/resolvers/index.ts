import { mergeResolvers } from '@graphql-tools/merge'

import userResolver from './user.resolvers'

const resolvers = mergeResolvers([userResolver])

export default resolvers
