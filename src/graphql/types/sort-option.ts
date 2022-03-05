import { gql } from "apollo-server-express"

export default gql`

    input SortOption {
        sort: String
        page: Int! @constraint(min: 0)
        limit: Int! @constraint(min: 0, max: 20)
    }
`
