import { gql } from "apollo-server-express"

const userDefs = gql`
    
    type User implements Document {
        _id: ID!
        id: ID
        
        name: String!
        email: String!
        slug: String!

        role: String!
        avatar: String
        banner: String
        province: String
        about: String

        countRecipe: Int
        countRating: Int
        totalRating: Int

        rating: Int
        
        createdAt: Float!
    }

    type Token {
        token: String!
    }
    
    input SignUpInput {
        name: String!
        email: String!
        password: String!
    }
    
    input SignInInput {
        email: String!
        password: String!
    }
    
    type Query {
        me: User
    }
    
    type Mutation {
        signup(input: SignUpInput!): Token!
        signin(input: SignInInput!): Token!
    }
`
export default userDefs
