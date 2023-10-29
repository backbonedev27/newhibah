const { Permohonan, Keagamaan, Ktp, Rab, Proposal } = require("../models");
const { Sequelize } = require("sequelize");

const permohonan = async (req, res) => {
  const { body, user, files } = req;

  if (!user || !user.nik) {
    console.log(user?.nik); // Log the user's NIK before the return statement
    return res.status(401).json({
      message: "You are not authenticated.",
    });
  }

  if (!files) {
    return res.status(400).json({
      message: "Files not found. Please ensure you upload the necessary files.",
    });
  }

  const requiredFields = ["nama", "alamat", "wilayah"];

  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({
        message: `Field '${field}' is required.`,
      });
    }
  }

  // Mencari keberadaan keagamaan
  const existingKeagamaan = await Keagamaan.findByPk(body.keagamaanid);

  if (existingKeagamaan) {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    if (existingKeagamaan.createdAt > twoYearsAgo) {
      const lastSubmissionDate = existingKeagamaan.createdAt;
      const lastSubmissionFormattedDate =
        lastSubmissionDate.toLocaleDateString("id-ID");
      const nextSubmissionDate = new Date();
      nextSubmissionDate.setFullYear(nextSubmissionDate.getFullYear() + 2);
      const nextSubmissionFormattedDate =
        nextSubmissionDate.toLocaleDateString("id-ID");

      return res.status(400).json({
        message: `Anda harus menunggu 2 tahun untuk mengajukan permohonan lagi. Terakhir diajukan pada: ${lastSubmissionFormattedDate}. Anda dapat mengajukan lagi setelah: ${nextSubmissionFormattedDate}`,
      });
    }
  }

  const maxSizes = {
    ktp: 1 * 1024 * 1024, // 1MB
    rab: 1 * 1024 * 1024, // 1MB
    proposal: 5 * 1024 * 1024, // 5MB
  };

  const ktpFile = req.files["file_ktp"];
  if (!ktpFile) {
    return res.status(400).json({ message: "KTP file not found" });
  }

  if (ktpFile[0].size > maxSizes.ktp) {
    return res.status(400).json({
      message: "KTP file size exceeds the maximum allowed size (1MB)",
    });
  }

  const rabFile = req.files["file_rab"];
  if (!rabFile) {
    return res.status(400).json({ message: "RAB file not found" });
  }

  if (rabFile[0].size > maxSizes.rab) {
    return res.status(400).json({
      message: "RAB file size exceeds the maximum allowed size (1MB)",
    });
  }

  const proposalFile = req.files["file_proposal"];
  if (!proposalFile) {
    return res.status(400).json({ message: "Proposal file not found" });
  }

  if (proposalFile[0].size > maxSizes.proposal) {
    return res.status(400).json({
      message: "Proposal file size exceeds the maximum allowed size (5MB)",
    });
  }

  try {
    const ktpData = new Ktp({
      namafile: ktpFile[0].originalname,
      size: ktpFile[0].size,
    });
    const ktpSaved = await ktpData.save();

    const rabData = new Rab({
      namafile: rabFile[0].originalname,
      size: rabFile[0].size,
    });
    const rabSaved = await rabData.save();

    const proposalData = new Proposal({
      namafile: proposalFile[0].originalname,
      size: proposalFile[0].size,
    });
    const proposalSaved = await proposalData.save();

    const keagamaanData = new Keagamaan({
      id: body.keagamaanid,
      nama: body.nama,
      alamat: body.alamat,
      wilayah: body.wilayah,
    });

    const keagamaanSaved = await keagamaanData.save();

    const permohonanData = new Permohonan({
      nama: body.nama,
      notelpon: body.notelpon,
      keagamaanid: keagamaanSaved.id,
      pengajuandana: body.pengajuandana,
      tujuan: body.tujuan,
      norek: body.norek,
      statusid: 1,
      kategoriid: body.kategoriid,
      ktpid: ktpSaved.id,
      rabid: rabSaved.id,
      keterangan: body.keterangan,
      proposalid: proposalSaved.id,
      userid: user.nik,
    });

    const permohonanSaved = await permohonanData.save();
    return res.status(201).json({
      success: true,
      message: "Request successfully created",
      data: permohonanSaved,
    });
  } catch (error) {
    console.error("Error:", error); // Handle error, log, or return specific error message
    return res.status(500).json({ message: "Failed to save the data" });
  }
};

module.exports = {
  permohonan,
};
