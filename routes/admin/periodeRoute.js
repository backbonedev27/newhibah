const express = require("express");
const perioderoute = express.Router();
const periode_controller = require("../../controllers/admin/periodeController");
const auth = require("../../middleware/verifyToken");
const { checkrole } = require("../../middleware/roleCheck");

perioderoute.post(
  "/periodes",
  auth,
  checkrole,
  periode_controller.verifyPeriode
);

module.exports = perioderoute;
