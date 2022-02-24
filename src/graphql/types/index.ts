import {mergeTypeDefs} from "@graphql-tools/merge";

import userSchema from "./user"
import category from "./category"
import recipe from "./recipe"

const typesArray = [userSchema, category, recipe]

export default mergeTypeDefs(typesArray)
