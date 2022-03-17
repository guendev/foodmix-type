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

    input UserUpdateInput {
        name: String!
        avatar: String!
        banner: String!
        about: String
        province: String
        gender: Int @constraint(min: 1, max: 3)
    }
    
    input UserUpdatePasswordInput {
        currentPassword: String!
        newPassword: String!
    }
    
    type Query {
        me: User
        getUsers(filter: SortOption!): [User]!
        
        getProfile(id: String!): User!
        getReviewsProfile(id: String!, filter: SortOption!): [Review]!
        getRecipesProfile(id: String!, filter: SortOption!): [Recipe]!
    }
    
    type Notify {
        user: User!
        msg: String!
        error: Boolean
    }
    
    type Mutation {
        signup(input: SignUpInput!): Token!
        signin(input: SignInInput!): Token!
        
        updateUser(input: UserUpdateInput!): User!
        updateUserPassword(input: UserUpdatePasswordInput!): User!
    }
    
    type Subscription {
        
        subNotify: Notify
        subAccount: User!
    }
`
export default userDefs
