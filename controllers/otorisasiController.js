const { Dokumen } = require("../models"); // Adjust the path as needed

const approval = async (req, res) => {
  try {
    // Make sure a file has been uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "File not found." });
    }

    // Check if otorisasiid already exists in the database
    const existingDokumen = await Dokumen.findOne({
      where: { otorisasiid: req.body.otorisasiid },
    });

    if (existingDokumen) {
      return res
        .status(409)
        .json({ success: false, msg: "ID already exists." });
    }

    // Create a new Dokumen instance with data
    const dokumen = new Dokumen({
      otorisasiid: req.body.otorisasiid,
      namafile: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
    });

    // Save the data to the database
    const dokumenData = await dokumen.save();

    return res.status(201).json({ success: true, data: dokumenData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "An error occurred: " + error.message });
  }
};

module.exports = {
  approval,
};
