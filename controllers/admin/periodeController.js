const { Periode } = require("../../models");

const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) !== null;
};

const verifyPeriode = async (req, res) => {
  const { mulai, selesai } = req.body;

  // Lakukan validasi tanggal jika diperlukan
  if (!mulai || !selesai || !isValidDate(mulai) || !isValidDate(selesai)) {
    return res.status(400).json({ message: "Invalid dates" });
  }

  try {
    // Cek apakah sudah ada data periode
    const existingPeriod = await Periode.findOne();

    if (existingPeriod) {
      // Jika ada, lakukan pembaruan
      existingPeriod.mulai = mulai;
      existingPeriod.selesai = selesai;
      await existingPeriod.save();

      return res.status(200).json({
        message: "Periode updated successfully",
        data: existingPeriod,
      });
    } else {
      // Jika belum ada, buat data periode baru
      const newPeriod = await Periode.create({ mulai, selesai });
      return res
        .status(201)
        .json({ message: "Periode created successfully", data: newPeriod });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create or update periode",
      error: error.message,
    });
  }
};

module.exports = {
  verifyPeriode,
};
