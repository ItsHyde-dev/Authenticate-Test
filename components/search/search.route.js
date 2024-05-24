import express from "express";
import { authenticate } from "../../middleware/authenticate";
const searchRouter = express.Router();

searchRouter.post("/name", authenticate, controller.nameSearch);
searchRouter.post("/number", authenticate, controller.numberSearch);
searchRouter.post("/id/:id", authenticate, controller.idSearch);

export default searchRouter;
