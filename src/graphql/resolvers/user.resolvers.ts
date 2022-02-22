import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";

const userResolver: IResolvers = {

    Query: {
        me: (_, __, { user }) => {
           return user
        }
    },

    Mutation: {
        signup: async (_: any, { input }) => {
            return wrapperGraphql(() => signupAction(input))
        },
        signin: async (_, { input }) => {
            return wrapperGraphql(()=> signinAction(input))
        }
    }
}

export default userResolver
