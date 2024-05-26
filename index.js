import "dotenv/config";
import { getServerConfig } from "./config/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./components/auth/auth.routes.js";
import contactsRouter from "./components/contacts/contacts.route.js";


// this will initialize the database connection for us
import './database/postgres/postgres.connection.js'
import { syncModels } from "./database/postgres/syncModels.js";
import searchRouter from "./components/search/search.route.js";
syncModels()

const serverConfig = getServerConfig();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routing
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);
app.use("/search", searchRouter);

app.use(errorHandler);

app.listen(serverConfig.port, function(err) {
  if (err) console.log("Err: ", err);
  console.log("Server listening on port:", serverConfig.port);
});
