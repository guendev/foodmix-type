import { Router } from 'express'
import {createRecipe, searchRecipes} from "@validator/recipe.validation"
import {validator} from "@validator/index"
import controller from '@controllers/recipe.controller'
import permission from "@middleware/permission.middleware";
import {sortValidator} from "@validator/sort.validation";
import {createReview} from "@validator/reviews.validation";


// Constants
const router = Router();

// Paths
export const p = {
    many: '/many',
    create: '/single',
    search: '/search',
    random: '/random',
    single: '/single/:id',
    bookmark: '/single/:id/bookmark',
    reviews: '/single/:id/reviews'
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

router.get(p.reviews, sortValidator, validator, controller.getManyReviews)

router.get(p.bookmark, permission('*'), controller.checkBookmark)

/***********************************************************************************
 *                                  Mutation
 **********************************************************************************/
router.post(p.create, permission('*'), createRecipe, validator, controller.create)
router.patch(p.single, permission('*'), createRecipe, validator, controller.update)
router.delete(p.single, permission('*'), controller.remove)
router.post(p.bookmark, permission('*'), controller.bookmark)

// Đăng review
router.post(p.reviews, permission('*'), createReview, validator, controller.postReview)

// Export default
export default router;
