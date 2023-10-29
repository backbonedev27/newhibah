const express = require("express");
const user_route = express.Router(); // Use express.Router() to define a router
const user_controller = require("../controllers/userController");

user_route.post("/register", user_controller.register);

module.exports = user_route; // Export the user route, not an object with "user_route" property
