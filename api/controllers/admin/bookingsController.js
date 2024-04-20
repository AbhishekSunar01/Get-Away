const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
require("dotenv").config();

const listOfBookings = async (req, res) => {
  try {
    const bookings = await prisma.bookings.findMany({
      include: {
        property: true, // Include the Property relation
      },
    });

    // Group bookings by property
    const groupedBookings = bookings.reduce((acc, booking) => {
      const key = booking.property.title;
      if (!acc[key]) {
        acc[key] = {
          bookingCount: 0,
          totalAmount: 0,
          dates: [],
        };
      }
      acc[key].bookingCount += 1;
      acc[key].totalAmount += booking.totalPrice;
      acc[key].dates.push({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      });
      return acc;
    }, {});

    // Convert to array of { propertyName, bookingCount, totalAmount, dates }
    const bookingsWithDetails = Object.entries(groupedBookings).map(
      ([propertyName, { bookingCount, totalAmount, dates }]) => ({
        propertyName,
        bookingCount,
        totalAmount,
        dates,
      })
    );

    res.json(bookingsWithDetails);
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
    await prisma.bookings.delete({
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
