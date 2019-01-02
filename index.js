const mongoose = require ('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const genres = require('./routes/genres')

mongoose.connect('mongodb://localhose/vidly')
.then(()=> console.log('Connected to MongoDB..')
.catch((err) => console.error('could not connected to MongoDB');
 );
)
app.use(express.json()); // for pasring the JSON body 
// express.json() return a middleware 
app.use(logger);
app.use('/api/genres', genres)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));