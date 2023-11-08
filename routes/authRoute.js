const express = require("express");
const auth_route = express.Router();
const auth_controller = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const periodeCheck = require("../middleware/periodeCheck");

auth_route.post("/logins", periodeCheck, auth_controller.login);
auth_route.post("/logout", verifyToken, auth_controller.logout);

module.exports = auth_route;
