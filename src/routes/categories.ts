import { Router } from 'express'

import { validator } from '@validator/index'
import controller from '@controllers/category.controller'
import { createCategory } from "@validator/categories.validation";
import {sortValidator} from "@validator/sort.validation";



// Constants
const router = Router();

// Paths
export const p = {
    all: '/all',
    single: '/single/:id',
    create: '/single',
    recipes: '/single/:id/recipes'
} as const;



/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.all, controller.getAll)
router.get(p.single, controller.getOne)
router.get(p.recipes, sortValidator, validator, controller.recipes)


/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.post(p.create, createCategory, validator, controller.create)
router.patch(p.single, createCategory, validator, controller.update)
// Todo: delete category


// Export default
export default router;
