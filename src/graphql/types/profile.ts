import { gql } from "apollo-server-express"

const profileDefs = gql`
    type Query {
        getProfile(id: String!): User!
        getReviewsProfile(id: String!, filter: SortOption!): [Review]!
        getRecipesProfile(id: String!, filter: SortOption!): [Recipe]!
    }
`
export default profileDefs
