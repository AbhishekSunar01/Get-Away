const express = require("express");
const bookingRouter = express.Router();
const { addBooking, getBookings } = require("../controllers/bookingController");

bookingRouter.post("/add/:id", addBooking);
bookingRouter.get("/", getBookings);

module.exports = bookingRouter;
