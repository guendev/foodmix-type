import { Router } from 'express'

import { validator } from '@validator/index'
import controller from '@controllers/category.controller'
import { createCategory } from "@validator/categories.validation";



// Constants
const router = Router();

// Paths
export const p = {
    all: '/all',
    single: '/single/:id',
    create: '/single'
} as const;



/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.all, controller.getAll)
// xem thông tin
router.get(p.single, controller.getOne)


/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.post(p.create, createCategory, validator, controller.create)
router.patch(p.single, createCategory, validator, controller.update)


// Export default
export default router;
