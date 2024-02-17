// Import necessary modules
const express = require("express");
const propertyRouter = express.Router();
const { addProperties } = require("../controllers/propertyController");
const imageDownloader = require("image-downloader");

propertyRouter.post("/add", addProperties);

module.exports = propertyRouter;
