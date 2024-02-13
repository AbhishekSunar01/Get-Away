const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const logout = async (req, res) => {
  const token = req.cookies.jwt;
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (refreshToken) {
    await prisma.refreshToken.delete({ where: { id: refreshToken.id } });

    res.clearCookie("jwt");
    res.json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ error: "Invalid refresh token" });
  }
};
module.exports = { logout };
