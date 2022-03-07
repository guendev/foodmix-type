import { gql } from "apollo-server-express"

export default gql`

    type Recipe {
        id: ID!

        name: String!
        slug: String!
        avatar: String!
        content: String!
        category: Category
        user: User
        ingredients: [Ingredient]
        stepper: [Stepper]
        time: String!
        preparation: String!

        views: Int!
        countRating: Int!
        totalRating: Int!

        createdAt: Float!
    }
    
    type Ingredient {
        name: String!,
        count: Int!,
        unit: String!
    }

    type Stepper {
        name: String!,
        content: String!,
        image: String
    }
    
    input SearchRecipeFilter {
        keyword: String
        category: String
        page: Int! @constraint(min: 0)
        limit: Int! @constraint(min: 0, max: 20)
    }
    
    type Query {
        getRecipe(id: String!): Recipe!
        getRecipes(filter: SortOption!): [Recipe]!
        getSearchRecipes(filter: SearchRecipeFilter!): [Recipe]!
    }
`
