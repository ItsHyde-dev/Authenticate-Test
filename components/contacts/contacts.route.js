import express from 'express'
import * as controller from './contacts.controllers.js';
import { authenticate } from '../../middleware/authenticate.js';
const contactRouter = express.Router()

contactRouter.post('/mark-spam', authenticate, controller.markSpam)

export default contactRouter;
