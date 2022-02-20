import { Router } from 'express'

import { validator } from '@validator/index'
import controller from '@controllers/category.controller'
import { createCategory } from "@validator/categories.validation";



// Constants
const router = Router();

// Paths
export const p = {
    getAll: '/all',
    getOne: '/single/:id',
    create: '/single'
} as const;



/**
 * Router
 */
router.get(p.getAll, controller.getAll)
// xem thông tin
router.get(p.getOne, controller.getOne)
// tạo category
router.post(p.create, createCategory, validator, controller.create)


// Export default
export default router;
