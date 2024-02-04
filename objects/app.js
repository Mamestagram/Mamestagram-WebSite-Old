const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(
    session({
        secret: "meronsan",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 12 * 30 * 24 * 60 * 60 * 1000 }
    })
);
module.exports = app;