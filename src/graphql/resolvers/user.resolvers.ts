import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";
import {meAction} from "@actions/query/user.query";

const userResolver: IResolvers = {

    Query: {
        me: (_, __, { user }) => {
           return wrapperGraphql(() => meAction(user))
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
