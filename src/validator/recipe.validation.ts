import {check, ValidationChain} from 'express-validator'
import {sortValidator} from "@validator/sort.validation";

export const createRecipe: ValidationChain[] = [
    check('name', 'Tên là bắt buộc').not().isEmpty(),
    check('avatar', 'Avatar là bắt buộc').not().isEmpty(),
    check('content', 'Mô tả là bắt buộc').not().isEmpty(),
    check('category', 'Phân loại là bắt buộc').not().isEmpty(),
    check('ingredients', 'Ingredients là bắt buộc').not().isEmpty(),
    check('ingredients', 'Ingredients không hợp lệ').isArray({ min: 1 }),
    check('ingredients').custom(
        /**
         *
         * @param value { Array }
         * @param req
         */
        (value, { req }) => {
            if (
                value.every(
                    (e: { hasOwnProperty: (arg0: string) => any; count: string }) =>
                        e.hasOwnProperty('name') &&
                        e.hasOwnProperty('unit') &&
                        e.hasOwnProperty('count') &&
                        parseInt(e.count)
                )
            ) {
                return true
            }
            throw new Error('Ingredients không hợp lệ')
        }
    ),
    check('stepper', 'Stepper là bắt buộc').not().isEmpty(),
    check('stepper', 'Stepper không hợp lệ').isArray({ min: 1 }),
    check('stepper').custom(
        /**
         *
         * @param value { Array }
         * @param req
         */
        (value, { req }) => {
            if (value.every((e: { hasOwnProperty: (arg0: string) => any }) => e.hasOwnProperty('content'))) {
                return true
            }
            throw new Error('Stepper không hợp lệ')
        }
    ),
    check('time', 'Time là bắt buộc').not().isEmpty(),
    check('preparation', 'Time là bắt buộc').not().isEmpty()
]

export const searchRecipes: ValidationChain[] = [
    check('page', 'Page không được để trống').isNumeric(),
    check('limit', 'Limit không được để trống').isNumeric(),
]
