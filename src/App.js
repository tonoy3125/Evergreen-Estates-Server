const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


// ! Routes
const UsersRouter = require("./Route/UsersRoute/UsersRoute");
const PropertyRouter = require("./Route/PropertyRoute/PropertyRoute");
const ReviewRouter = require("./Route/ReviewRoute/ReviewRoute");




//middleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Users Router declaration Middleware routes
app.use("/api/v1", UsersRouter);

//Property Router declaration Middleware routes
app.use("/api/v1", PropertyRouter);

//Review Router declaration Middleware routes
app.use("/api/v1", ReviewRouter);

//Review Router declaration Middleware routes
app.use("/api/v1", ReviewRouter);

// Error Router
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong");
});

//Exports
module.exports = app;
