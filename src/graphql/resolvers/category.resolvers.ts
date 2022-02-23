import { IResolvers } from '@graphql-tools/utils'
import {wrapperGraphql} from "@actions/wrapper";
import {allCategoryAction} from "@actions/query/category.query";

const categoryResolver: IResolvers = {

    Query: {
        getAllCategories: async () => wrapperGraphql(() => allCategoryAction())
    }

}

export default categoryResolver
