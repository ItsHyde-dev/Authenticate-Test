import { Sessions } from "../models/sessions.model.js"

async function storeToken(token, number) {
  return Sessions.create({ token, number })
}

async function checkTokenAndNumberExist(token, number) {
  return await Sessions.findOne({ where: { token, number } }) != null
}

const sessionQueries = {
  checkTokenAndNumberExist,
  storeToken
}

export default sessionQueries
