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
    origin: ["http://localhost:5173", "http://localhost:5174"],
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
const bookingRouter = require("./routes/bookingRoute");
const { verifyJWT } = require("./middleware/verifyJWT");
const { verifyAdminToken } = require("./middleware/verifyAdminToken");
const adminUsersRouter = require("./routes/admin/usersRoute");
const adminBookingsRouter = require("./routes/admin/bookingsRoute");
const adminPropertyRouter = require("./routes/admin/propertyRoute");
const adminDashboardRouter = require("./routes/admin/dashboardRoute");
const adminLoginRouter = require("./routes/admin/loginRoute");
const adminLogoutRouter = require("./routes/admin/logoutRoute");

app.use("/api/user", userRouter);

app.get("/api/properties", async (req, res) => {
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
});

app.use("/api/property", verifyJWT, propertyRouter);
app.use("/api/profile", verifyJWT, profileRouter);
app.use("/api/logout", verifyJWT, logoutRouter);
app.use("/api/booking", verifyJWT, bookingRouter);

app.get("/api/property/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Image: true,
      },
    });

    res.json(property);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the property." });
  }
});

app.use("/api/admin", adminLoginRouter);
app.use("/api/admin", verifyAdminToken, adminDashboardRouter);
app.use("/api/admin", verifyAdminToken, adminUsersRouter);
app.use("/api/admin", verifyAdminToken, adminPropertyRouter);
app.use("/api/admin", verifyAdminToken, adminBookingsRouter);
app.use("/api/admin", verifyAdminToken, adminLogoutRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("My app is running on port", port);
});
