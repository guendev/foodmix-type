import { gql } from "apollo-server-express"

export default gql`

    type Bookmark {
        id: ID!
        user: User
        recipe: Recipe
        createdAt: Float
    }
    
    type Query {
        checkBookmark(id: String!): Bookmark
    }

    type Mutation {
        bookmarkToggle(id: String!): Bookmark
    }
`
