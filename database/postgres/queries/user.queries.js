import { BadRequestError } from "../../../constants/errors.js";
import { Users } from "../models/users.model.js";

async function getUserByNumber(number) {
  return Users.findOne({
    where: {
      number: number,
    },
    raw: true,
  });
}

async function createUser({ name, number, password, email }) {
  return Users.create({ name, number, password, email }, { raw: true }).catch((err) => {
    if (err.name == "SequelizeUniqueConstraintError") {
      throw BadRequestError(
        `User with that ${err.errors[0].path} already exists`
      );
    }
  });
}

async function searchUserByNumber(number) {
  return Users.findOne({
    where: {
      number: number,
    },
    attributes: ["id", "number", "name"],
    raw: true,
  });
}

const userQueries = {
  getUserByNumber,
  createUser,
  searchUserByNumber,
};

export default userQueries;
