import contactQueries from "../../database/postgres/queries/contacts.queries.js";
import validate from "../../utils/validate.js";
import { nameSearchSchema } from "./search.validation.js";

export async function nameSearch(req, res, next) {
  try {
    validate(nameSearchSchema, req.body)
    const { name, skip, limit } = req.body

    const entries = await contactQueries.findByName(name, skip, limit)
    res.json({
      contacts: entries
    })
  }
  catch (error) {
    next(error);
  }
}

export async function numberSearch(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function idSearch(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}
