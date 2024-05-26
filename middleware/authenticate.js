import { BadRequestError } from "../constants/errors.js"
import jwt from 'jsonwebtoken'
import sessionQueries from "../database/postgres/queries/sessions.queries.js"

export const authenticate = async (req, _, next) => {
  const token = req.get("accessToken")
  if (!token) {
    next(BadRequestError("Access token not found"))
  }

  let claims

  try {
    claims = jwt.verify(token, process.env.JWT_SECRET)
    req.claims = {
      userNumber: claims.number,
      userId: claims.id
    }

    if (!claims.number || !claims.id) {
      throw new Error("Invalid token")
    }
  } catch (error) {
    console.log(error)
    return next(BadRequestError("Invalid Token"))
  }

  // check if token is in the database
  const tokenExistsInDB = await sessionQueries.checkTokenAndNumberExist(token, claims.number)
  if (!tokenExistsInDB) {
    console.log("Token not found in database")
    next(BadRequestError("Invalid Token"))
  }

  next()
}
