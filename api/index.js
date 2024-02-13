const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

const userRouter = require("./routes/userRoutes");
const logoutRouter = require("./routes/logoutRoute");
const { verifyJWT } = require("./middleware/verifyJWT");

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.use("/api/user", userRouter);

app.use(verifyJWT);
app.get("/api/profile", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json(user);
});

app.get("/api/protected", (req, res) => {
  res.json({ message: "This is a protected route" });
});
app.use("/api/logout", logoutRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("My app is running on port", port);
});
