const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const listOfBookings = async (req, res) => {
  try {
    const bookings = await prisma.bookings.findMany();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the bookings." });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the booking." });
  }
};

module.exports = { listOfBookings, deleteBooking };
