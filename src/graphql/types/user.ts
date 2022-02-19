import { gql } from "apollo-server-express"

const userDefs = gql`
    type User {
        id: ID!
        name: String!
    }

    type Query {
        getAll: [User]!
    }
    
    type Subscription {
        subUser: User!
    }
`
export default userDefs
