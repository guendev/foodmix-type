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
    search: '/search'
} as const;



/**
 * Router
 */
router.get(p.many, sortValidator, validator, controller.getMany)
router.post(p.create, permission('*'), createRecipe, validator, controller.create)
router.patch(p.single, permission('*'), createRecipe, validator, controller.update)
router.get(p.search, searchRecipes, validator, controller.search)

// Export default
export default router;
