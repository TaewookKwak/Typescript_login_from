const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const iniparser = require("iniparser");
const port = process.env.PORT || 3003;

const config = iniparser.parseSync("./config.ini");
const api = require("./api");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const LOGIN_ROUTER = require("./router/LoginRouter");
app.post(api.login, LOGIN_ROUTER);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
