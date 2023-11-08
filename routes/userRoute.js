const express = require("express");
const user_route = express.Router(); // Use express.Router() to define a router
const user_controller = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const { checkrole } = require("../middleware/roleCheck");

user_route.post("/users", user_controller.register);
user_route.get("/users", verifyToken, checkrole, user_controller.getusers);

module.exports = user_route; // Export the user route, not an object with "user_route" property
