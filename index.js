import "dotenv/config";
import { getServerConfig } from "./config/config.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'

// start application server
const serverConfig = getServerConfig();

const app = express();
app.use(cors());
app.use(bodyParser.json())

// start routing

app.get("/", (req, res) => {
  console.log(req.body);
  throw new Error("There was an error here")
})


app.listen(serverConfig.port, function(err) {
  if (err) console.log("Err: ", err)
  console.log("Server listening on port:", serverConfig.port)
})
