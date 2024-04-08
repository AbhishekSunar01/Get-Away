const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const listOfProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true,
      },
    });
    res.json(properties);
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
    await prisma.property.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the property." });
  }
};

module.exports = { listOfProperties, deleteProperty };
