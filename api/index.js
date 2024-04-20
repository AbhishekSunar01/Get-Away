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

const axios = require("axios");

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

app.post("/api/khalti", verifyJWT, async (req, res) => {
  const { purchase_order_id, purchase_order_name, amount } = req.body;
  const userId = req.user ? req.user.id : null;
  console.log(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const data = {
    return_url: "http://localhost:5173/payment",
    website_url: "http://localhost:5173/",
    amount: amount,
    purchase_order_id,
    purchase_order_name,
    customer_info: {
      name: user.name,
      email: user.email,
    },
  };

  try {
    const response = await axios({
      method: "post",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      data: data,
      headers: {
        Authorization: "key 1f321a829ba14e379b80dedb83327539",
        "Content-Type": "application/json",
      },
    });

    res.json({ data: response.data });
  } catch (error) {
    console.error("Error from Khalti API", error.response.data);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

app.post("/api/payment", verifyJWT, async (req, res) => {
  const { bookingId, status } = req.body;
  const bookingIdInt = parseInt(bookingId, 10); // Convert bookingId to integer

  try {
    await prisma.payment.upsert({
      where: { id: bookingIdInt },
      update: { status },
      create: {
        status,
        bookingId: bookingIdInt,
      },
    });

    res.status(200).json({ message: "Payment status updated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the payment status." });
  }
});

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

app.get;

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
