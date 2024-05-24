import "dotenv/config";
import { getServerConfig } from "./config/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./components/auth/auth.routes.js";
import contactsRouter from "./components/contacts/contacts.route.js";


// this will initialize the database connection for us
import { testDbConnection } from './database/postgres/postgres.connection.js'
import { syncModels } from "./database/postgres/syncModels.js";
testDbConnection()
syncModels()

const serverConfig = getServerConfig();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// start routing
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

app.use(errorHandler);

app.listen(serverConfig.port, function(err) {
  if (err) console.log("Err: ", err);
  console.log("Server listening on port:", serverConfig.port);
});
