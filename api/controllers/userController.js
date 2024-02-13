const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const prisma = new PrismaClient();
require("dotenv").config();

const register = async (req, res) => {
  const { email, password, name } = req.body;

  async function createUser(email, password, name) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    console.log(`Created new user: ${newUser.email}`);
    res``
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  }

  createUser(email, password, name)
    .catch((e) => {
      res.status(500).send({ error: e.message });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Logged in successfully", token: refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

module.exports = { register, login };
