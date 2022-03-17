import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {
    manyRecipesAction, randomRecipesAction,
    recipeAction,
    searchRecipeAction,
    searchRecipesByIngredientAction
} from "@actions/query/recipe.query";
import {withFilter} from "graphql-subscriptions";
import {channel, pubsub} from "@graphql/pubsub";

const categoryResolver: IResolvers = {

    Query: {
        getRecipe: async (_, { id }, { req }) => wrapperGraphql(() => recipeAction(id, req)),

        getRecipes: async (_, { filter }) => wrapperGraphql(() => manyRecipesAction(filter)),

        getSearchRecipes: async (_, { filter }) => wrapperGraphql(() => searchRecipeAction(filter)),

        getSearchRecipesByIngredient: async (_, { name, filter }) => wrapperGraphql(() => searchRecipesByIngredientAction(name, filter)),

        getRandomRecipes: async (_, { size }) => wrapperGraphql(() => randomRecipesAction(size))
    },

    Subscription: {
        subRecipe: {
            subscribe: withFilter(
                () => {
                    return pubsub.asyncIterator(channel.RECIPE)
                },
                (payload, variables) => {
                    return payload.subRecipe.slug == variables.id
                }
            )
        }
    }

}

export default categoryResolver
