const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");

// routermäärittelyt tänne
const usersRoutes = require("./routes/users-routes");
const storiesRoutes = require("./routes/stories-routes");

const app = express();

const uri = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@cluster0.aemhc.mongodb.net/BicycleSite?retryWrites=true&w=majority`;

app.use(morgan("dev"));
app.use(express.json());

// sallitaan CORS-pyynnöt ja autentikointi
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/stories", storiesRoutes);
app.use(express.static("public")); // public folder for serving images
// If route not found
app.use("/", (req, res, next) => {
  res.status(404).json({ message: "No such endpoint" });
});

// ketjun viimeinen virhekäsittelijä tänne
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .send({ message: error.message || "Unknown error" });
});

// MongoDB:n yhteyskuvaaja ja optioiden määrittelyt tänne
mongoose
  .connect(uri)
  .then(() => {
    app.listen(5000);
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
