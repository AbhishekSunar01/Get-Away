const express = require("express");
const {
  listOfProperties,
  deleteProperty,
} = require("../../controllers/admin/propertyController");

const adminPropertyRouter = express.Router();

adminPropertyRouter.get("/properties", listOfProperties);
adminPropertyRouter.delete("/properties/:id", deleteProperty);

module.exports = adminPropertyRouter;
