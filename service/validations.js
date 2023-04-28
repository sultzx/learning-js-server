import { body } from 'express-validator'

export const registration = [
    body('username', 'Қолданушы аты енгізілмеген!').isLength({ min: 2, max: 30 }).isString(),
    body('email', 'Поштаңыз енгізілмеген!').isEmail(),
    body('password', 'Құпия сөзіңіз енгізілмеген!').isLength({ min: 6, max: 16 }).isString()
]

export const login = [
    body('login').optional(),
    body('password').isLength({ min: 5, max: 24 }).isString()
]

export const update = [
    body('lastname').optional().isString(),
    body('firstname').optional().isString(),
    body('patronymic').optional().isString(),
    body('phone').optional().isString(),
    body('username').optional().isString(),
    body('birthdate').optional().isDate(),
]