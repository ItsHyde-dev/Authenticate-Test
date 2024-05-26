import "dotenv/config";
import "./database/postgres/postgres.connection.js";
import { Contacts } from "./database/postgres/models/contacts.model.js";
import { Users } from "./database/postgres/models/users.model.js";
import bcrypt from "bcrypt";

const getNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000);
};

for (let i = 0; i < 10; i++) {
  Users.create({
    name: "TestUser",
    number: getNumber(),
    password: bcrypt.hashSync("pass@123", 10),
  });
}

const names = [
  "mark",
  "mareek",
  "remak",
  "keram",
  "kramark",
  "anne",
  "roxanne",
  "annette",
];

let data = [];

for (let i = 0; i < 1000; i++) {
  const randomSeed = Math.floor(Math.random() * 8);

  data.push({
    name: names[randomSeed],
    number: getNumber(),
    created_by: Math.floor(i / 100) + 1,
  });
}

Contacts.bulkCreate(data)
  .then((cb) => {
    console.log(cb);
  })
  .catch((err) => {
    console.log("Error:", err);
  });
