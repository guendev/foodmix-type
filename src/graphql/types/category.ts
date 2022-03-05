import { gql } from "apollo-server-express"

export default gql`

    type Category {
        id: ID

        name: String!
        slug: String!
        avatar: String!
        content: String!
        icon: String!

        createdAt: Float!
    }
    
    input CreateCategoryInput {
        name: String!
        avatar: String!
        content: String!
    }
    
    type Query {
        getAllCategories: [Category]!
        getOneCategory(id: String!): Category!
        getRecipesBycategories(slug: String! filter: SortOption!): [Recipe]!
    }
    
    type Mutation {
        createCategory(input: CreateCategoryInput!): Category!
        updateCategory(id: String!, input: CreateCategoryInput!): Category!
    }
`
