import { IResolvers } from '@graphql-tools/utils'

const userResolver: IResolvers = {
    Query: {
        getAll: (_: any) => {}
    }
}

export default userResolver
