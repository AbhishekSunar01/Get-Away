const express = require("express");
const logoutRouter = express.Router();
const { logout } = require("../../controllers/admin/logoutController");

logoutRouter.post("/logout", logout);

module.exports = logoutRouter;
