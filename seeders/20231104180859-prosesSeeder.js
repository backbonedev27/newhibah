"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Proses",
      [
        {
          nama: "VERIFIKASI PERSYARATAN ADMINISTRASI",
          keterangan: "LENGKAP DAN PEBAIKAN",
        },
        {
          nama: "VERIFIKASI FAKTUAL(SURVEI LAPANGAN)",
          keterangan: "SESUAI PERMOHONAN",
        },
        {
          nama: "REKOMENDASI",
          keterangan: "TELAH DIREKOMENDASIKAN",
        },
        {
          nama: "PERTIMBANGAN TAPD",
          keterangan: "TELAH DISETUJUI",
        },
        {
          nama: "PENGANGGARAN",
          keterangan: "TELAH DIANGGARKAN",
        },
        {
          nama: "PENERBITAN SK SDH DAN DOKUMEN LAINNNYA",
          keterangan: "TELAH DIPROSES",
        },
        {
          nama: " PENANDATANGANAN NPHD,PAKTA INTEGRITAS,PERNYATAAN TANGGUNG JAWAB DLL",
          keterangan: "TELAH DILAKSANAKAN",
        },
        {
          nama: "PENCAIRAN DANA BANTUAN HIBAH",
          keterangan: "TELAH DILAKSANAKAN",
        },
        {
          nama: "LAPORAN PERTANGGUNGJAWABAN PENGGUNAAN DANA BANTUAN HIBAH",
          keterangan: "TELAH DITERIMA",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Proses", null, {});
  },
};
