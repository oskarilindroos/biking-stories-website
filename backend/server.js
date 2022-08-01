const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// routermäärittelyt tänne
const usersRoutes = require("./routes/users-routes");
const storiesRoutes = require("./routes/stories-routes");

const pwd = "EtkYiQuZowSWVFaC"; // TODO: Add db password to env variables
const app = express();

const uri = `mongodb+srv://mongo_admin:${pwd}@cluster0.aemhc.mongodb.net/BicycleSite?retryWrites=true&w=majority`;

app.use(morgan("dev"));
app.use(express.json());

// sallitaan CORS-pyynnöt ja autentikointi
//app.use((req, res, next) => {});

// tänne reitityskutsut
app.use("/api/users", usersRoutes);
app.use("/api/stories", storiesRoutes);

// olemattomien osoitteiden käsittely tänne
app.use("/", (req, res, next) => {
  res.status(404).json({ error: "No such endpoint" });
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
  .connect(uri) //TODO: Add options
  .then(() => {
    app.listen(5000);
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
