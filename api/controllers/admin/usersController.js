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
  const userId = parseInt(id, 10); // Convert id to integer

  try {
    // Delete refresh tokens related to the user
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    // Delete properties and their related records
    const properties = await prisma.property.findMany({
      where: { userId },
      select: { id: true },
    });

    for (let property of properties) {
      // Delete images related to the property
      await prisma.Image.deleteMany({
        where: { propertyId: property.id },
      });

      // Delete bookings and their associated payments related to the property
      const bookings = await prisma.bookings.findMany({
        where: { propertyId: property.id },
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
        where: { id: property.id },
      });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

module.exports = { listOfUsers, deleteUser };
