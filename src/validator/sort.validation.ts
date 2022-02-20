import {check, ValidationChain} from 'express-validator'

export const sortValidator: ValidationChain[] = [
    check('page', 'Page không được để trống').isNumeric(),
    check('limit', 'Limit không được để trống').isNumeric(),
    check('order', 'Order không hợp lệ').not().isEmpty()
]
