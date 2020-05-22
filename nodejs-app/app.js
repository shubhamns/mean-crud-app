const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// database init
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch(() => {
    console.log("failed connected to database");
  });

// Routes
const userRoutes = require("./routes/user");

// Middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));

// Routes
app.use("/api", userRoutes);

// PORT
const port = process.env.PORT || 3000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
