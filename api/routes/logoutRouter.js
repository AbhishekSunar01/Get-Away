const express = require("express");
const { logout } = require("../controller/logoutController");
const logoutRouter = express.Router();

logoutRouter.post("/", logout);

module.exports = logoutRouter;
