const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRoute");
const propertyRouter = require("./routes/propertyRoute");
const logoutRouter = require("./routes/logoutRoute");
const { verifyJWT } = require("./middleware/verifyJWT");

app.use("/api/user", userRouter);

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true, // Include related Image records
      },
    });

    res.json(properties); // Send the properties as a response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the properties." });
  }
});

app.use(verifyJWT);
app.use("/api/property", propertyRouter);

app.use("/api/profile", profileRouter);
app.use("/api/logout", logoutRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("My app is running on port", port);
});
