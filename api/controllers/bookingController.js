const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addBooking = async (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user.id;
  const { checkIn, checkOut } = req.body;

  try {
    const booking = await prisma.booking.create({
      data: {
        checkIn,
        checkOut,
        propertyId: parseInt(propertyId),
        userId,
      },
    });

    res.json(booking);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the booking." });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        property: true, // Include related property records
      },
    });

    res.json(bookings); // Send the bookings as a response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the bookings." });
  }
};

module.exports = { addBooking, getBookings };
