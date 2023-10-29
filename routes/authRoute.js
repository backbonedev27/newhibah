const express = require("express");
const auth_route = express.Router();
const auth_controller = require("../controllers/authController");

auth_route.post("/login", auth_controller.login);

module.exports = auth_route;
