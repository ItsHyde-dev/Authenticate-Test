import { BadRequestError } from "../../constants/errors.js";
import contactQueries from "../../database/postgres/queries/contacts.queries.js";
import sessionQueries from "../../database/postgres/queries/sessions.queries.js";
import userQueries from "../../database/postgres/queries/user.queries.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validate from "../../utils/validate.js";

export async function login(req, res, next) {
  try {
    validate(loginSchema, req.body)

    const { number, password } = req.body;
    const user = await userQueries.getUserByNumber(number);

    if (!user) {
      throw BadRequestError("Incorrect credentials");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw BadRequestError("Incorrect credentials");
    }

    const token = jwt.sign({ number }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await sessionQueries.storeToken(token, number)
    res.json({
      message: "Logged in successfully",
      token,
    });

  } catch (error) {
    next(error);
  }
}

export async function signup(req, res, next) {
  const saltRounds = 10;

  try {
    validate(signupSchema, req.body)

    const { name, number, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // should throw any errors it faces
    await userQueries.createUser({
      name,
      number,
      email,
      password: hashedPassword,
    });

    await contactQueries.createContact({
      name,
      number,
      createdBy: null,
      spam: false
    });

    res.status(200).json({
      message: "successfully created user",
    });
  } catch (error) {
    next(error);
  }
}
