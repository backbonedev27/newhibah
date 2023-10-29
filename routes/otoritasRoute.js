const express = require("express");
const otoritas_route = express();
const auth = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
otoritas_route.use(bodyParser.json());
otoritas_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

otoritas_route.use(express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/dokumen"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });
const otoritas_controller = require("../controllers/otorisasiController");

otoritas_route.post(
  "/otorisasi",
  upload.single("namafile"),
  auth,
  otoritas_controller.approval
);

module.exports = otoritas_route;
