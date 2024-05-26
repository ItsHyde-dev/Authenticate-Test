import { Op, literal, fn, col } from "sequelize";
import { Contacts } from "../models/contacts.model.js";

async function createContact({ name, number, createdBy, spam = false }) {
  return Contacts.upsert({
    name,
    number,
    created_by: createdBy,
    marked_spam: spam,
  });
}

async function findByName(name, skip = 0, limit = 10) {
  return Contacts.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [[literal(`POSITION(LOWER('${name}') IN LOWER(name))`), "ASC"]],
    offset: skip,
    limit,
  });
}

async function findByNumber({ number, skip = 0, limit = 10 }) {
  return Contacts.findAll({
    where: {
      number,
    },
    attributes: ["id", "number", "name"],
    offset: skip,
    limit,
  });
}

async function getDetailsByNumber(number) {
  return Contacts.findAll({
    attributes: [
      "number",
      [fn("COUNT", col("*")), "total_count"],
      [
        fn(
          "COUNT",
          literal('case when "marked_spam" = true then 1 else null end')
        ),
        "marked_spam_count",
      ],
      [fn("MIN", col("name")), "name"],
    ],
    where: { number },
    group: "number",
    raw: true,
  });
}

async function findByNumberAndCreatedBy(number, createdBy) {
  return Contacts.findOne({
    where: {
      number,
      created_by: createdBy,
    },
    raw: true,
  });
}

const contactQueries = {
  createContact,
  findByName,
  findByNumber,
  getDetailsByNumber,
  findByNumberAndCreatedBy,
};

export default contactQueries;
