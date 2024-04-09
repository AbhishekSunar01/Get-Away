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
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

module.exports = { listOfUsers, deleteUser };
