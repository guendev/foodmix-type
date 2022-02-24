import { gql } from "apollo-server-express"

export default gql`

    type Recipe {
        id: ID

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
        content: String!,
        image: String
    }
    
    type Query {
        getRecipe(id: String!): Recipe!
    }
`
