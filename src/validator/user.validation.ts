import {check, ValidationChain} from 'express-validator'

export const createUser: ValidationChain[] = [
    check('name', 'Tên không được để trống').not().isEmpty(),
    check('email', 'Email không được để trống').not().isEmpty(),
    check('email', 'Email không đúng').isEmail(),
    check('password', 'Mật khẩu không được để trống').not().isEmpty(),
    check('password', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({ min: 6 })
]


export default {
    createUser
} as const
