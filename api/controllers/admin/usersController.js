const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const listOfUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        properties: true, // Include the properties relation
      },
    });

    // Map over the users to add a propertyCount field
    const usersWithPropertyCount = users.map((user) => ({
      ...user,
      propertyCount: user.properties.length, // Count the number of properties
    }));

    res.json(usersWithPropertyCount);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Get all properties of the user
    const properties = await prisma.property.findMany({
      where: {
        userId: parseInt(id),
      },
    });

    // Delete images and bookings related to each property
    for (let property of properties) {
      await prisma.image.deleteMany({
        where: {
          propertyId: property.id,
        },
      });

      await prisma.bookings.deleteMany({
        where: {
          propertyId: property.id,
        },
      });
    }

    // Delete properties
    await prisma.property.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    // Delete refresh tokens
    await prisma.refreshToken.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    // Delete user
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the user and associated data.",
    });
  }
};

module.exports = { listOfUsers, deleteUser };
