import { mergeResolvers } from '@graphql-tools/merge'

import userResolver from './user.resolvers'
import categoryResolver from "@graphql/resolvers/category.resolvers";
import recipeResolvers from "@graphql/resolvers/recipe.resolvers";

const resolvers = mergeResolvers([userResolver, categoryResolver, recipeResolvers])

export default resolvers
