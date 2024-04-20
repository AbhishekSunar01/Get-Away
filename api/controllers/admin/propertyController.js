const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const listOfProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true,
        User: true, // Include the User relation
      },
    });

    // Map over the properties to add a userName field
    const propertiesWithUserName = properties.map((property) => ({
      ...property,
      userName: property.User.name, // Add the user's name
    }));

    res.json(propertiesWithUserName);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the properties." });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const propertyId = parseInt(id, 10); // Convert id to integer

  try {
    // Delete images related to the property
    await prisma.image.deleteMany({
      where: { propertyId },
    });

    // Delete bookings and their associated payments related to the property
    const bookings = await prisma.bookings.findMany({
      where: { propertyId },
      select: { id: true },
    });

    for (let booking of bookings) {
      await prisma.payment.deleteMany({
        where: { bookingId: booking.id },
      });

      await prisma.bookings.delete({
        where: { id: booking.id },
      });
    }

    // Delete property
    await prisma.property.delete({
      where: { id: propertyId },
    });

    res.json({ message: "Property and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while deleting the property and associated data.",
    });
  }
};

const topPopularProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true,
        User: true,
        Bookings: true, // Include the Bookings relation
      },
    });

    // Sort the properties based on the number of bookings in descending order
    const sortedProperties = properties.sort(
      (a, b) => b.Bookings.length - a.Bookings.length
    );

    // Get the top 6 properties
    const topProperties = sortedProperties.slice(0, 6);

    // Map over the top properties to add a userName field and only include the title and number of bookings
    const topPropertiesWithUserName = topProperties.map((property) => ({
      title: property.title,
      numberOfBookings: property.Bookings.length,
      userName: property.User.name,
    }));

    res.json(topPropertiesWithUserName);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the top properties." });
  }
};

module.exports = { listOfProperties, deleteProperty, topPopularProperties };
