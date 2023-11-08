const { Op } = require("sequelize");
const { Periode } = require("../models");

const periodeCheck = async (req, res, next) => {
  try {
    const currentDate = new Date();

    const activePeriod = await Periode.findOne({
      where: {
        mulai: { [Op.lte]: currentDate },
        selesai: { [Op.gte]: currentDate },
      },
    });

    if (activePeriod) {
      const { selesai } = activePeriod;

      return res.status(403).json({
        message: `Mohon Maaf, Akses Ditutup hingga ${selesai}. Silakan coba lagi nanti.`,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memeriksa periode." });
  }
};

module.exports = periodeCheck;
