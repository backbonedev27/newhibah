const express = require("express");
const path = require("path");
const permohonan_controller = require("../controllers/permohonanController");
const auth = require("../middleware/verifyToken");
const multer = require("multer");
const permohonan_route = express();
const bodyparser = require("body-parser");
const fs = require("fs");

permohonan_route.use(bodyparser.json());
permohonan_route.use(bodyparser.urlencoded({ extended: true }));
permohonan_route.use(express.static("public"));

const deleteUploadedFiles = async (files) => {
  files.forEach(async (file) => {
    if (file && file.length > 0) {
      const filePath = file[0].path;
      try {
        fs.unlinkSync(filePath); // Delete the file
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    }
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Set the directory for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueFileName =
      file.fieldname +
      "-" +
      Date.now() +
      "." +
      file.originalname.split(".").pop();
    cb(null, uniqueFileName); // Set the filename for the uploaded file
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    req.pdfUploadError = "Only PDF files are allowed";
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // File size limit (10MB)
  },
}).fields([
  { name: "file_ktp" },
  { name: "file_rab" },
  { name: "file_proposal" },
  { name: "file_suket" },
  { name: "file_burek" },
  { name: "file_asetrekom" },
  { name: "file_suratpermohonan" },
  { name: "file_sk" },
]);

// Setting up the route to handle POST requests
permohonan_route.post(
  "/permohonans",
  upload,
  // async (req, res, next) => {
  //   if (req.pdfUploadError) {
  //     return res.status(400).json({ message: req.pdfUploadError });
  //   }
  //   const ktpFiles = req.files["file_ktp"];
  //   const rabFiles = req.files["file_rab"];
  //   const suketFiles = req.files["file_suket"];
  //   const burekFiles = req.files["file_burek"];
  //   const proposalFiles = req.files["file_proposal"];
  //   const asetrekomFiles = req.files["file_asetrekom"];
  //   const suratpermohonanFiles = req.files["file_suratpermohonan"];
  //   const skFiles = req.files["file_sk"];

  //   if (
  //     !ktpFiles ||
  //     !rabFiles ||
  //     !suketFiles ||
  //     !burekFiles ||
  //     !skFiles ||
  //     !proposalFiles ||
  //     !asetrekomFiles ||
  //     !suratpermohonanFiles
  //   ) {
  //     return res.status(400).json({ message: "Wajib mengunggah file" });
  //   }

  //   const saveFile = async (file, Model) => {
  //     if (file && file.length > 0) {
  //       const fileData = new Model({
  //         namafile: file[0].filename,
  //         size: file[0].size,
  //         path: file[0].path,
  //       });
  //       await fileData.save();
  //     }
  //   };
  //   // ...

  //   try {
  //     const savedFiles = await Promise.all([
  //       saveFile(ktpFiles, Ktp),
  //       saveFile(rabFiles, Rab),
  //       saveFile(suketFiles, Suket),
  //       saveFile(burekFiles, Burek),
  //       saveFile(skFiles, Sk),
  //       saveFile(proposalFiles, Proposal),
  //       saveFile(suratpermohonanFiles, Suratpermohonan),
  //     ]);

  //     // Check if any of the savedFiles are null (indicating an error)

  //     return res.status(201).json({ message: "Files uploaded successfully" });
  //   } catch (error) {
  //     // If an error occurs during the database save, delete the uploaded files
  //     await deleteUploadedFiles([
  //       ktpFiles,
  //       rabFiles,
  //       suketFiles,
  //       burekFiles,
  //       skFiles,
  //       proposalFiles,
  //       suratpermohonanFiles,
  //       asetrekomFiles,
  //     ]);
  //     return res.status(500).json({ message: "Gagal menyimpan file" });
  //   }
  // },
  auth,
  permohonan_controller.permohonan
);

module.exports = permohonan_route;
