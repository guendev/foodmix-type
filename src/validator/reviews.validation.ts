import {check, ValidationChain} from 'express-validator'

export const createReview: ValidationChain[] = [
    check('content', 'Nội dung review không được để trống').not().isEmpty(),
    check('totalRating', 'Điểm số là bắt buộc').not().isEmpty(),
    check('totalRating', 'Điểm số phải là số').isNumeric()
]


export default {
    createReview
} as const
