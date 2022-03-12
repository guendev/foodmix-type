import { gql } from "apollo-server-express"

const userDefs = gql`
    
    type User {
        id: ID!
        
        name: String!
        email: String!
        slug: String!

        gender: Int

        role: String!
        avatar: String
        banner: String
        province: String
        about: String

        countRecipe: Int
        countRating: Int
        totalRating: Int
        
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
        getUsers(filter: SortOption!): [User]!
        getProfile(id: String!): User!
    }
    
    type Notify {
        user: User!
        msg: String!
        error: Boolean
    }
    
    type Mutation {
        signup(input: SignUpInput!): Token!
        signin(input: SignInInput!): Token!
    }
    
    type Subscription {
        
        subNotify: Notify
        
    }
`
export default userDefs
