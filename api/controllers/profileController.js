const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const profile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json(user);
};

module.exports = { profile };
