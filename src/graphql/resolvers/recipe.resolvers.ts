import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {allCategoryAction, oneCategoryAction} from "@actions/query/category.query";
import { updateCategoryAction } from '@actions/mutations/category.mutation';
import {manyRecipesAction, recipeAction, searchRecipeAction} from "@actions/query/recipe.query";

const categoryResolver: IResolvers = {

    Query: {
        getRecipe: async (_, { id }, { req }) => wrapperGraphql(() => recipeAction(id, req)),

        getRecipes: async (_, { filter }) => wrapperGraphql(() => manyRecipesAction(filter)),

        getSearchRecipes: async (_, { filter }) => wrapperGraphql(() => searchRecipeAction(filter))
    }

}

export default categoryResolver
