import { gql } from "apollo-server-express"

export default gql`

    type Review {
        id: ID!
        user: User
        recipe: Recipe
        content: String!
        totalRating: Int!
        createdAt: Float!
    }
    
    input AddReviewInput {
        content: String! @constraint(minLength: 50)
        totalRating: Int ! @constraint(min: 0, max: 20)
    }
    
    type Query {
        getReviews(id: String!, filter: SortOption!): [Review]!
    }
    
    type Mutation {
        addReview(id: String!, input: AddReviewInput!): Review!
    }
    
    type Subscription {
        "Real time đánh giá mới"
        subNewReviews(id: String): Review!
    }
`
