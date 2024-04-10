const express = require("express");
const {
  listOfProperties,
  deleteProperty,
  topPopularProperties,
} = require("../../controllers/admin/propertyController");

const adminPropertyRouter = express.Router();

adminPropertyRouter.get("/properties", listOfProperties);
adminPropertyRouter.delete("/properties/:id", deleteProperty);
adminPropertyRouter.get("/popular", topPopularProperties);

module.exports = adminPropertyRouter;
