const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
const getAllGoals = require("./routes/goalRoutes");
app.use("/api/goals", getAllGoals);

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`));
