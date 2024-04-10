const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
require("dotenv").config();

const count = async (req, res) => {
  console.log("count is called");

  try {
    const users = await prisma.user.count();
    const properties = await prisma.property.count();
    const bookings = await prisma.bookings.count();

    res.json({ users, properties, bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the count." });
  }
};

module.exports = { count };
