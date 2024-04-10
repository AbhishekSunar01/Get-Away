const express = require("express");

const {
  listOfBookings,
  deleteBooking,
} = require("../../controllers/admin/bookingsController");

const adminBookingsRouter = express.Router();

adminBookingsRouter.get("/bookings", listOfBookings);
adminBookingsRouter.delete("/bookings/:id", deleteBooking);

module.exports = adminBookingsRouter;
