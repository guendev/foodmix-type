import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {signinAction, signupAction} from "@actions/mutations/user.mutation";
import {meAction} from "@actions/query/user.query";
import {withFilter} from "graphql-subscriptions";

import {channel, pubsub} from "../pubsub"

const userResolver: IResolvers = {

    Query: {
        me: (_, __, { user }) => {
           return wrapperGraphql(() => meAction(user))
        }
    },

    Mutation: {
        signup: async (_: any, { input }) => {
            console.log(input)
            return wrapperGraphql(() => signupAction(input))
        },
        signin: async (_, { input }) => {
            return wrapperGraphql(()=> signinAction(input))
        }
    },

    Subscription: {
        subNotify: {
            subscribe: withFilter(
                (_, args) => {
                    return pubsub.asyncIterator(channel.NOTIFY)
                },
                (payload, variables, { user }) => {
                    return payload.notify.user.id === user.id
                }
            )
        },
    }
}

export default userResolver
