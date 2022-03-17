import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {signinAction, signupAction, updateUserAction, updateUserPasswordAction} from "@actions/mutations/user.mutation";
import {getProfileAction, getUsersAction, meAction} from "@actions/query/user.query";
import {withFilter} from "graphql-subscriptions";

import {channel, pubsub} from "../pubsub"
import {AuthenticationError} from "apollo-server-express";
import {manyReviewsActions} from "@actions/query/reviews.query";
import {postReviewAction} from "@actions/mutations/review.mutation";

const userResolver: IResolvers = {

    Query: {
        getReviews: async (_, { id, filter }) => wrapperGraphql(() => manyReviewsActions(id,filter))
    },

    Mutation: {
        addReview: async (_, { id, input }, { user }) => {

            if (!user) {
                throw new AuthenticationError('Bạn cần đăng nhập')
            }
            return wrapperGraphql(() => postReviewAction(id, user, input))

        }
    }
}

export default userResolver
