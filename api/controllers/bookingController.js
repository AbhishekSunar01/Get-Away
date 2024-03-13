const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addBooking = async (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user.id;
  const { checkIn, checkOut } = req.body;

  // Validate checkIn and checkOut
  if (!Date.parse(checkIn) || !Date.parse(checkOut)) {
    return res.status(400).json({ error: "Invalid checkIn or checkOut date." });
  }

  try {
    const booking = await prisma.bookings.create({
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
    const userId = req.user.id;
    const bookings = await prisma.bookings.findMany({
      where: {
        userId: userId,
      },
      include: {
        property: {
          include: {
            Image: true,
            User: true,
          },
        },
        user: true,
      },
    });

    // Print the user who added the property for each booking
    bookings.forEach((booking) => {
      console.log(booking.property.User);
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the bookings." });
  }
};

const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    await prisma.bookings.delete({
      where: {
        id: parseInt(bookingId),
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

module.exports = { addBooking, getBookings };
