import { BadRequestError } from "../../../constants/errors.js";
import { Users } from "../models/users.model.js";

async function getUserByNumber(number) {
  return Users.findOne({
    where: {
      number: number
    }, raw: true
  })
}

async function createUser({ name, number, password, email }) {
  return Users.create({ name, number, password, email }).catch((err) => {
    if (err.name == "SequelizeUniqueConstraintError") {
      throw BadRequestError(`User with that ${err.errors[0].path} already exists`)
    }
  })
}

const userQueries = {
  getUserByNumber,
  createUser
}

export default userQueries
