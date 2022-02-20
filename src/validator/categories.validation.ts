import {check, ValidationChain} from 'express-validator'

export const createCategory: ValidationChain[] = [
    check('name', 'Tên không được để trống').not().isEmpty(),
    check('avatar', 'Avatar không được để trống').not().isEmpty(),
    check('content', 'Nội dung không được để trống').not().isEmpty()
]


export default {
    createCategory
} as const
