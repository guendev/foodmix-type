import { Router } from 'express'
import {createRecipe, searchRecipes} from "@validator/recipe.validation"
import {validator} from "@validator/index"
import controller from '@controllers/recipe.controller'
import permission from "@middleware/permission.middleware";
import {sortValidator} from "@validator/sort.validation";


// Constants
const router = Router();

// Paths
export const p = {
    many: '/many',
    single: '/single/:id',
    create: '/single',
    search: '/search',
    random: '/random'
} as const;



/**
 * Router
 */
/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.many, sortValidator, validator, controller.getMany)
router.get(p.search, searchRecipes, validator, controller.search)
router.get(p.single, controller.single)
router.get(p.random, controller.random)

/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.post(p.create, permission('*'), createRecipe, validator, controller.create)
router.patch(p.single, permission('*'), createRecipe, validator, controller.update)
router.delete(p.single, permission('*'), controller.remove)

// Export default
export default router;
