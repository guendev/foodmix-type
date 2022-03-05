import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {allCategoryAction, categoryToRecipesAction, oneCategoryAction} from "@actions/query/category.query";
import { updateCategoryAction } from '@actions/mutations/category.mutation';

const categoryResolver: IResolvers = {

    Query: {
        getAllCategories: async () => wrapperGraphql(() => allCategoryAction()),

        getOneCategory: async (_, { id }, { req }) => wrapperGraphql(() => oneCategoryAction(id)),

        getRecipesBycategories: async (_, { slug, filter }) => wrapperGraphql(() => categoryToRecipesAction(slug, filter))
    },

    Mutation: {
        updateCategory: async (_, { id, input }) => wrapperGraphql(() => updateCategoryAction(id, input))
    }

}

export default categoryResolver
