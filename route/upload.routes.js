import express from 'express'
import multer from 'multer'

import * as controllers from '../controller/upload.controller.js'
import checkAuth from '../middleware/checkAuth.js'
import storageService from '../service/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)

export default uploadRouter 