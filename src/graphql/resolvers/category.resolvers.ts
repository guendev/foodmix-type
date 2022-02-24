import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {allCategoryAction, oneCategoryAction} from "@actions/query/category.query";
import { updateCategoryAction } from '@actions/mutations/category.mutation';

const categoryResolver: IResolvers = {

    Query: {
        getAllCategories: async () => wrapperGraphql(() => allCategoryAction()),

        getOneCategory: async (_, { id }) => wrapperGraphql(() => oneCategoryAction(id))
    },

    Mutation: {
        updateCategory: async (_, { id, input }) => wrapperGraphql(() => updateCategoryAction(id, input))
    }

}

export default categoryResolver
