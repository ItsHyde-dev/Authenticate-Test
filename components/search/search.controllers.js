import contactQueries from "../../database/postgres/queries/contacts.queries.js";
import userQueries from "../../database/postgres/queries/user.queries.js";
import validate from "../../utils/validate.js";
import {
  idSearchSchema as getDetailByNumberSchema,
  nameSearchSchema,
  numberSearchSchema,
} from "./search.validation.js";

export async function nameSearch(req, res, next) {
  try {
    validate(nameSearchSchema, req.body);
    const { name, skip, limit } = req.body;

    const results = await contactQueries.findByName(name, skip, limit);
    res.json({
      contacts: results,
    });
  } catch (error) {
    next(error);
  }
}

export async function numberSearch(req, res, next) {
  try {
    validate(numberSearchSchema, req.body);
    const { number, skip, limit } = req.body;

    const userFound = await userQueries.searchUserByNumber(number);
    if (userFound) {
      return res.json({
        contacts: userFound,
      });
    }

    const contactsFound = await contactQueries.findByNumber({
      number,
      skip,
      limit,
    });

    if (!contactsFound) {
      return res.json({
        message: "Could not find contacts with that number",
      });
    }

    return res.json({
      contacts: contactsFound,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDetailsByNumber(req, res, next) {
  try {
    validate(getDetailByNumberSchema, req.body);
    const { number } = req.body;

    const contactDetails = await contactQueries.getDetailsByNumber(number);
    const userTableDetails = await userQueries.getUserByNumber(number);

    let response = {
      ...contactDetails[0],
    };

    if (userTableDetails?.name) {
      response.name = userTableDetails.name;
    }

    const userInTargetContacts = await contactQueries.findByNumberAndCreatedBy(
      number,
      req.claims.userId
    );

    if (userInTargetContacts) {
      response.email = userTableDetails?.email;
    }

    return res.json({ details: response });
  } catch (error) {
    next(error);
  }
}
