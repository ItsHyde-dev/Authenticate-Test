import validate from "../../utils/validate.js"
import { markSpamSchema } from "./contacts.validation.js"

export async function markSpam(req, res, next) {
  try {
    validate(markSpamSchema, req.body)

    console.log("requestor number", req.body.userNumber)
    //TODO: logic


    res.send("Success")
  } catch (error) {
    next(error)
  }
}
