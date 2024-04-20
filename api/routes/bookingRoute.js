const express = require("express");
const bookingRouter = express.Router();
const {
  addBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/bookingController");

bookingRouter.post("/add/:id", addBooking);
bookingRouter.get("/", getBookings);
bookingRouter.delete("/delete", deleteBooking);

module.exports = bookingRouter;
