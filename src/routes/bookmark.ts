import { Router } from 'express'

import {sortValidator} from "@validator/sort.validation"
import {validator} from "@validator/index"
import controller from '@controllers/bookmark.controller'
import permission from "@middleware/permission.middleware";

// Constants
const router = Router();

// Paths
export const p = {
    many: '/many'
} as const;


/**
 * Router
 */
/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.many, permission('*'), sortValidator, validator, controller.many)

export default router;
