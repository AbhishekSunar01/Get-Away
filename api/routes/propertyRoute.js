const express = require("express");
const propertyRouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { addProperties } = require("../controllers/propertyController");
propertyRouter.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

propertyRouter.post("/add", upload.array("images", 5), addProperties);

module.exports = propertyRouter;
