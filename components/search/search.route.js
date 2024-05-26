import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import * as controller from "./search.controllers.js"
const searchRouter = express.Router();

searchRouter.post("/name", authenticate, controller.nameSearch);
searchRouter.post("/number", authenticate, controller.numberSearch);
searchRouter.post("/details", authenticate, controller.getDetailsByNumber);

export default searchRouter;
