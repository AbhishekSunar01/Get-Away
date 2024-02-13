const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
      });

      if (refreshToken && payload.id === refreshToken.userId) {
        req.user = { id: payload.id };
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } catch (err) {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyJWT };
