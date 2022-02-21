import { Router } from 'express'
import multer from "multer"

import permission from "@middleware/permission.middleware"
import controller from '@controllers/upload.controller'


const storage = multer.diskStorage({
    destination: 'public/upload/temp',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
})


// Constants
const router = Router();

// Paths
export const p = {
    single: '/single'
} as const;

router.post(p.single, permission('*'), upload.single('image'), controller.single)

// Export default
export default router
