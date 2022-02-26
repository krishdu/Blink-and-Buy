const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//middlewares
app.use(errorHandlerMiddleware);

module.exports = app;
