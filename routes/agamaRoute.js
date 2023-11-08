const express = require("express");
const agamasroute = express.Router();
const agamas_controller = require("../controllers/agamaController");
const verifyToken = require("../middleware/verifyToken");
const { checkrole } = require("../middleware/roleCheck");

agamasroute.post("/keagamaans", verifyToken, agamas_controller.registagama);
agamasroute.get(
  "/keagamaans",
  verifyToken,
  checkrole,
  agamas_controller.agamas
);

module.exports = agamasroute;
