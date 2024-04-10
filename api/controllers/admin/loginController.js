const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await prisma.admin.findUnique({
        where: {
          email: email,
          password: password,
        },
      });
      if (user) {
        const token = jwt.sign({ email: email }, "secret", {
          expiresIn: "1h",
        });

        await prisma.admin.update({
          where: {
            email: email,
          },
          data: {
            token: token,
          },
        });

        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .json({ message: "Logged in successfully.", token: token });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the count." });
  }
};

module.exports = { login };
