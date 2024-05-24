import express from 'express'
import * as controller from './auth.controllers.js';
const authRouter = express.Router()

authRouter.post('/login', controller.login)
authRouter.post('/signup', controller.signup)

export default authRouter;
