import { Op } from "sequelize";
import { Contacts } from "../models/contacts.model.js";

async function createContact({ name, number, createdBy, spam = false }) {
  return Contacts.create({ name, number, created_by: createdBy, marked_spam: spam })
}

async function findByName(name, skip=0, limit=10) {
  const entries = Contacts.findAll({
    where: {
      name: Op.like(name)
    },
    offset: skip,
    limit
  })
}

const contactQueries = {
  createContact
}

export default contactQueries
