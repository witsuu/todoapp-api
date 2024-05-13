const route = require("express").Router();
const { userScheme } = require("../models/userScheme");

const { signUp } = require("../app/controllers/authController");

route.get("/", userScheme);

route.post("/signup", signUp);

module.exports = route;
