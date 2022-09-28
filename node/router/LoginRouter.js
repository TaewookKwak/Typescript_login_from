const express = require("express");
const api = require("../api");

const router = express.Router();
const LoginController = require("../controller/LoginController");

router.post(api.login, LoginController.login);
module.exports = router;
