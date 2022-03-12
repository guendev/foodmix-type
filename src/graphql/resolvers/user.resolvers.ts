import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";
import {getProfileAction, getUsersAction, meAction} from "@actions/query/user.query";
import {withFilter} from "graphql-subscriptions";

import {channel, pubsub} from "../pubsub"
import {AuthenticationError} from "apollo-server-express";

const userResolver: IResolvers = {

    Query: {
        me: (_, __, { user }) => {
           return wrapperGraphql(() => meAction(user))
        },
        getUsers: (_, { filter }) => wrapperGraphql(() => getUsersAction(filter)),

        getProfile: (_, { id }) => wrapperGraphql(() => getProfileAction(id))
    },

    Mutation: {
        signup: async (_: any, { input }) => {
            return wrapperGraphql(() => signupAction(input))
        },
        signin: async (_, { input }) => {
            return wrapperGraphql(()=> signinAction(input))
        }
    },

    Subscription: {
        subNotify: {
            subscribe: withFilter(
                (_, args, { user }) => {
                    if (!user) {
                        throw new AuthenticationError('Yêu cầu đăng nhập')
                    }
                    return pubsub.asyncIterator(channel.NOTIFY)
                },
                (payload, variables, { user }) => {
                    return payload.subNotify.user.id === user.id
                }
            )
        },
    }
}

export default userResolver
