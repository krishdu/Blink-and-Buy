const express = require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

app.use(express.json());

//Route Imports
const products = require('./routes/productRoute');

app.use('/api/v1', products);

//middlewares
app.use(errorHandlerMiddleware);

module.exports = app;