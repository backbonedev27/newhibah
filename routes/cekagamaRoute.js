const express = require("express");
const cekagama_route = express.Router(); // Use express.Router() to define a router
const cekagama_controller = require("../controllers/cekagamaController");
const verifyToken = require("../middleware/verifyToken");

cekagama_route.post("/cekagamas", verifyToken, cekagama_controller.cekagama);

module.exports = cekagama_route; // Export the user route, not an object with "user_route" property
