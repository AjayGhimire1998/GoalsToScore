const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

connectDB();
app.use(express.json());
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const goalRoutes = require("./routes/goalRoutes");
app.use("/api/goals", goalRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
