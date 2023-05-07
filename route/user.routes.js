import express from 'express'

import * as validation from '../service/validations.js'
import validationHandler from '../service/validationHandler.js'
import * as controller from '../controller/user.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const userRouter = express.Router()

userRouter.post('/auth/registration', validation.registration, validationHandler, controller.registration)
userRouter.post('/auth/push-scores',checkAuth, controller.pushScores)
userRouter.post('/auth/login', validation.login, validationHandler, controller.login)
userRouter.get('/me', checkAuth, controller.me)
userRouter.patch('/me/update', checkAuth, controller.update)
userRouter.patch('/me/set-score', checkAuth, controller.setScore)
userRouter.get('/me/get-score', checkAuth, controller.getScore)

export default userRouter