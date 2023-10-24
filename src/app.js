
const express = require("express");
const app = express();
const ordersRouter = require("./routes/orders");
const db = require("./models/dbConfig");
require("dotenv").config();

app.use(express.json());


app.use("/api/orders", ordersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
