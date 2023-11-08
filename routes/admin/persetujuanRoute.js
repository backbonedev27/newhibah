const express = require("express");
const persetujuanroute = express.Router();
const persetujuan_controller = require("../../controllers/admin/persetujuanController");
const auth = require("../../middleware/verifyToken");
const { checkrole } = require("../../middleware/roleCheck");

persetujuanroute.post(
  "/persetujuan/:id",
  auth,
  checkrole,
  persetujuan_controller.persetujuan
);

persetujuanroute.delete(
  "/persetujuan/:id",
  auth,
  checkrole,
  persetujuan_controller.hapuspermohonan
);

persetujuanroute.get(
  "/persetujuan/:id",
  auth,
  checkrole,
  persetujuan_controller.detailpermohonan
);

persetujuanroute.get(
  "/download/:fileName",
  auth,
  checkrole,
  persetujuan_controller.downloadfile
);

module.exports = persetujuanroute;
