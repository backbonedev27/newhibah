const { Keagamaan, Kategori } = require("../models");
const { Sequelize } = require("sequelize");
const registagama = async (req, res) => {
  try {
    const { body } = req;

    if (
      !body.id ||
      !body.nama ||
      !body.alamat ||
      !body.wilayah ||
      !body.kategoriid
    ) {
      return res
        .status(400)
        .json({ message: "Harap lengkapi semua bidang yang diperlukan" });
    }

    const existingKeagamaan = await Keagamaan.findOne({
      where: { id: body.id },
    });

    if (existingKeagamaan) {
      return res.status(409).json({ message: "ID sudah terdaftar sebelumnya" });
    }

    const keagamaanData = new Keagamaan({
      id: body.id,
      nama: body.nama,
      alamat: body.alamat,
      wilayah: body.wilayah,
      kategoriid: body.kategoriid,
    });

    const keagamaanSaved = await keagamaanData.save();

    if (keagamaanSaved) {
      return res
        .status(201)
        .json({ message: "Data keagamaan berhasil disimpan" });
    } else {
      return res
        .status(500)
        .json({ message: "Gagal menyimpan data keagamaan" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan saat menyimpan data keagamaan",
      error: error.message,
    });
  }
};

const agamas = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Mendapatkan nomor halaman dari query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Mendapatkan batas data per halaman dari query parameter

    const offset = (page - 1) * limit; // Menghitung offset data

    const allAgamas = await Keagamaan.findAndCountAll({
      include: [{ model: Kategori, as: "Kategori", attributes: ["nama"] }],
      limit,
      offset,
    });

    const dataAgamas = allAgamas.rows.map((keagamaan) => ({
      id: keagamaan.id,
      nama: keagamaan.nama,
      alamat: keagamaan.alamat,
      wilayah: keagamaan.wilayah,
      kategori: {
        id: keagamaan.kategoriid,
        nama: keagamaan.Kategori.nama,
      },
    }));

    if (allAgamas.count === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    return res.status(200).json({ success: true, data: dataAgamas });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve agamas" });
  }
};

module.exports = {
  registagama,
  agamas,
};
