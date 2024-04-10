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
  try {
    // Delete images related to the property
    await prisma.image.deleteMany({
      where: {
        propertyId: parseInt(id),
      },
    });

    // Delete bookings related to the property
    await prisma.bookings.deleteMany({
      where: {
        propertyId: parseInt(id),
      },
    });

    // Delete property
    await prisma.property.delete({
      where: {
        id: parseInt(id),
      },
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

module.exports = { listOfProperties, deleteProperty };
