import { gql } from "apollo-server-express"

const documentDefs = gql`
    interface Document {
        _id: ID!
        id: ID
        
        createdAt: Float!
    }
`
export default documentDefs
