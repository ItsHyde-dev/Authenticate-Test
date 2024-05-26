import contactQueries from "../../database/postgres/queries/contacts.queries.js"
import validate from "../../utils/validate.js"
import { markSpamSchema } from "./contacts.validation.js"

export async function markSpam(req, res, next) {
  try {
    validate(markSpamSchema, req.body)

    const { name, number } = req.body

    await contactQueries.createContact({ name, number, createdBy: req.claims.userId, spam: true })
    res.json({
      message: "Successfully marked number as spam"
    })
  } catch (error) {
    next(error)
  }
}
