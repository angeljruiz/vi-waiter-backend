const express = require("express");
const logger = require("morgan");
const passport = require("passport");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const indexRouter = require("./routes/index");
const Auth = require("./config/auth");

app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Auth);
app.use("/", indexRouter);

module.exports = app;
