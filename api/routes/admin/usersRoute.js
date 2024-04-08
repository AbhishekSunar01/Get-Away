const express = require("express");

const {
  listOfUsers,
  deleteUser,
} = require("../../controllers/admin/usersController");

const adminUsersRouter = express.Router();

adminUsersRouter.get("/users", listOfUsers);
adminUsersRouter.delete("/users/:id", deleteUser);

module.exports = adminUsersRouter;
