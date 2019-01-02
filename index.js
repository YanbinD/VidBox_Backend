const mongoose = require("mongoose");
require("./models/genre");
require("./models/customers");
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const genresRoute = require("./routes/genresRoute");
const customersRoute = require("./routes/customersRoute");

mongoose
.connect("mongodb://localhost/vidly")
.then(() => console.log("Connected to MongoDB.."))
.catch(err => console.error("could not connected to MongoDB"));


app.use(express.json()); // for pasring the JSON body
// express.json() return a middleware
// app.use(logger);
app.use("/api/genres", genresRoute);
app.use("/api/customers", customersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
