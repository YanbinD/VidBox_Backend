const mongoose = require("mongoose");

const express = require("express");
const app = express();
const logger = require("./middleware/logger");

mongoose
.connect("mongodb://localhost/vidly")
.then(() => console.log("Connected to MongoDB.."))
.catch(err => console.error("could not connected to MongoDB"));

require("./models/genre");

const genresRoute = require("./routes/genresRoute");
app.use(express.json()); // for pasring the JSON body
// express.json() return a middleware
// app.use(logger);
app.use("/api/genres", genresRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
