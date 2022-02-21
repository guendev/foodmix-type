import { Router } from 'express'

import {sortValidator} from "@validator/sort.validation"
import {validator} from "@validator/index"
import controller from '@controllers/bookmark.controller'
import permission from "@middleware/permission.middleware";

// Constants
const router = Router();

// Paths
export const p = {
    many: '/many',
    single: '/single/:id',
} as const;


/**
 * Router
 */
/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.many, permission('*'), sortValidator, validator, controller.many)

/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.delete(p.single, permission('*'), controller.remove)
router.delete(p.many, permission('*'), controller.deleteMany)

export default router;
