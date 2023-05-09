import express from 'express'

import * as validation from '../service/validations.js'
import validationHandler from '../service/validationHandler.js'
import * as controller from '../controller/bootcamp.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const bootcampRouter = express.Router()

bootcampRouter.post('/', checkAuth, controller.create)

bootcampRouter.patch('/', checkAuth, controller.participate)

bootcampRouter.get('/', checkAuth,  controller.getAllBootcamps)

export default bootcampRouter