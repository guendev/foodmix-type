import {check, ValidationChain} from 'express-validator'

export const sortValidator: ValidationChain[] = [
    check('page', 'Page không được để trống').isNumeric(),
    check('limit', 'Limit không được để trống').isNumeric(),
    check('sort', 'Order không hợp lệ').not().isEmpty()
]
