import { Router } from 'express'

import controller from '@controllers/user.controller'
import { validator } from '@validator/index'
import { createUser } from '@validator/user.validation'



// Constants
const router = Router();

// Paths
export const p = {
    signup: '/signup',
    signin: '/signin',
    me: '/me'
} as const;



/***********************************************************************************
 *                                  Query
 **********************************************************************************/
router.get(p.me, controller.me)


/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.post(p.signup, createUser, validator, controller.signup)
router.post(p.signin, controller.signin)

// Export default
export default router;
