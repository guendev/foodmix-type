import { gql } from "apollo-server-express"

export default gql`

    type Category implements Document {
        _id: ID!
        id: ID

        name: String!
        slug: String!
        avatar: String!
        content: String!

        createdAt: Float!
    }
    
    type Query {
        getAllCategories: [Category]!
    }
`
