const express = require("express");

const adminLoginRouter = express.Router();
const { login } = require("../../controllers/admin/loginController");

adminLoginRouter.post("/login", login);

module.exports = adminLoginRouter;
