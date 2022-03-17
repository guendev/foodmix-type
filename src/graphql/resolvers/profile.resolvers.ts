import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {getProfileAction, getRecipesProfileAction, getReviewsprofileAction} from "@actions/query/user.query";

const profileResolver: IResolvers = {

    Query: {
        getProfile: (_, { id }) => wrapperGraphql(() => getProfileAction(id)),

        getRecipesProfile: (_, { id, filter }) => wrapperGraphql(() => getRecipesProfileAction(id, filter)),

        getReviewsProfile: (_, { id, filter }) => wrapperGraphql(() => getReviewsprofileAction(id, filter))
    }
}

export default profileResolver
