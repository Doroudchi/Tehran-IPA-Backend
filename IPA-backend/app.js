const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "X-API-KEY"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const lastViewedRoutes = require("./routes/lastviewed.routes");
app.use("/", lastViewedRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connection established"))
  .catch((err) => console.error("Database connection failed:", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database", err));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
