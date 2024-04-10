const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const addBooking = async (req, res) => {
//   const propertyId = req.params.id;
//   const userId = req.user.id;
//   const { checkIn, checkOut } = req.body;

//   // Validate checkIn and checkOut
//   if (!Date.parse(checkIn) || !Date.parse(checkOut)) {
//     return res.status(400).json({ error: "Invalid checkIn or checkOut date." });
//   }

//   try {
//     // Fetch the property data
//     const property = await prisma.property.findUnique({
//       where: { id: parseInt(propertyId) },
//     });

//     // Calculate the number of days between checkIn and checkOut
//     const checkInDate = new Date(checkIn);
//     const checkOutDate = new Date(checkOut);
//     const diffTime = Math.abs(checkOutDate - checkInDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     // Calculate the total price
//     const totalPrice = diffDays * property.price;

//     const booking = await prisma.bookings.create({
//       data: {
//         checkIn,
//         checkOut,
//         propertyId: parseInt(propertyId),
//         userId,
//         totalPrice, // Include the total price in the booking data
//       },
//     });

//     res.json(booking);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while adding the booking." });
//   }
// };

const addBooking = async (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user.id;
  const { checkIn, checkOut } = req.body;

  // Validate checkIn and checkOut
  if (!Date.parse(checkIn) || !Date.parse(checkOut)) {
    return res.status(400).json({ error: "Invalid checkIn or checkOut date." });
  }

  try {
    // Fetch the property data
    const property = await prisma.property.findUnique({
      where: { id: parseInt(propertyId) },
    });

    // Check if the property is already booked for the requested dates
    const existingBooking = await prisma.bookings.findFirst({
      where: {
        propertyId: parseInt(propertyId),
        OR: [
          {
            AND: [
              { checkIn: { lte: new Date(checkIn) } },
              { checkOut: { gte: new Date(checkIn) } },
            ],
          },
          {
            AND: [
              { checkIn: { lte: new Date(checkOut) } },
              { checkOut: { gte: new Date(checkOut) } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        error: "The property is already booked for the requested dates.",
      });
    }

    // Calculate the number of days between checkIn and checkOut
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate the total price
    const totalPrice = diffDays * property.price;

    const booking = await prisma.bookings.create({
      data: {
        checkIn,
        checkOut,
        propertyId: parseInt(propertyId),
        userId,
        totalPrice, // Include the total price in the booking data
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
