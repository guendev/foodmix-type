import {mergeTypeDefs} from "@graphql-tools/merge";

import userSchema from "./user"
import category from "./category"
import recipe from "./recipe"
import sortOption from "./sort-option"
import bookmark from "@graphql/types/bookmark"
import review from "@graphql/types/review"
import profileDefs from "@graphql/types/profile";

const typesArray = [userSchema, category, recipe, sortOption, bookmark, review, profileDefs]

export default mergeTypeDefs(typesArray)
