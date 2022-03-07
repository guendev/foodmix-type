import {mergeTypeDefs} from "@graphql-tools/merge";

import userSchema from "./user"
import category from "./category"
import recipe from "./recipe"
import sortOption from "./sort-option"
import bookmark from "@graphql/types/bookmark"

const typesArray = [userSchema, category, recipe, sortOption, bookmark]

export default mergeTypeDefs(typesArray)
