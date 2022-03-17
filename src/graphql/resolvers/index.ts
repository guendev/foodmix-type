import { mergeResolvers } from '@graphql-tools/merge'

import userResolver from './user.resolvers'
import categoryResolver from "@graphql/resolvers/category.resolvers";
import recipeResolvers from "@graphql/resolvers/recipe.resolvers";
import bookmarkResolvers from "@graphql/resolvers/bookmark.resolvers";
import reviewResolvers from "@graphql/resolvers/review.resolvers";
import profileResolver from "@graphql/resolvers/profile.resolvers";

const resolvers = mergeResolvers([userResolver, categoryResolver, recipeResolvers, bookmarkResolvers, reviewResolvers, profileResolver])

export default resolvers
