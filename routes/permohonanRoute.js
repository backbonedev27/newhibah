const express = require("express");
const permohonan_route = express();
const auth = require("../middleware/verifyToken");
const bodyParser = require("body-parser");
permohonan_route.use(bodyParser.json());
permohonan_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

// Menambahkan konfigurasi untuk menyimpan file
permohonan_route.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Pastikan jalur ke direktori permohonan adalah benar
    cb(null, path.join(__dirname, "../public/permohonan"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const permohonan_controller = require("../controllers/permohonanController");

// Menggunakan upload.fields untuk menerima dua file sekaligus
permohonan_route.post(
  "/permohonan",
  upload.fields([
    { name: "file_ktp", maxCount: 1 },
    { name: "file_rab", maxCount: 1 },
    { name: "file_proposal", maxCount: 1 },
  ]),
  auth,
  permohonan_controller.permohonan
);

module.exports = permohonan_route;
