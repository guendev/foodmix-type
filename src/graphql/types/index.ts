import {mergeTypeDefs} from "@graphql-tools/merge";

import documentDefs from "./document"
import userSchema from "./user"

const typesArray = [userSchema, documentDefs]

export default mergeTypeDefs(typesArray)
