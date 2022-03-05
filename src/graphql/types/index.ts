import {mergeTypeDefs} from "@graphql-tools/merge";

import userSchema from "./user"
import category from "./category"
import recipe from "./recipe"
import sortOption from "./sort-option"

const typesArray = [userSchema, category, recipe, sortOption]

export default mergeTypeDefs(typesArray)
