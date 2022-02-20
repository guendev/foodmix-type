import { Router } from 'express'
import {createRecipe} from "@validator/recipe.validation"
import {validator} from "@validator/index"
import controller from '@controllers/recipe.controller'
import permission from "@middleware/permission.middleware";


// Constants
const router = Router();

// Paths
export const p = {
    many: '/many',
    single: '/single/:id',
    create: '/single'
} as const;



/**
 * Router
 */
router.post(p.create, permission('*'), createRecipe, validator, controller.create)
router.patch(p.single, permission('*'), createRecipe, validator, controller.update)

// Export default
export default router;
