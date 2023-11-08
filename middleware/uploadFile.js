const multer = require("multer");

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
  // Check file type (for instance: accepting only PDF files)
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
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

module.exports = upload;
