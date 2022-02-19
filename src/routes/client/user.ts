import StatusCodes from 'http-status-codes'
import { Router } from 'express'

import controller from '@controllers/client/user.controller'
import { validator } from '@validator/index'
import { createUser } from '@validator/user.validation'



// Constants
const router = Router();

// Paths
export const p = {
    signup: '/signup',
    signin: '/signin'
} as const;



/**
 * Get all users.
 */
router.post(p.signup, createUser, validator, controller.signup)
router.post(p.signin, controller.signin)

// Export default
export default router;
