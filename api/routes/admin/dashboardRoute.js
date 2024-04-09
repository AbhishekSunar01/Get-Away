const express = require("express");

const { count } = require("../../controllers/admin/dasboardController");

const adminDashboardRouter = express.Router();

adminDashboardRouter.get("/count", count);

module.exports = adminDashboardRouter;
