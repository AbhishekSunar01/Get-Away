const express = require("express");
const port = process.env.PORT;
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("My app is running on port", port);
});
