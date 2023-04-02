// Import third-party module
const express = require('express');
const multer = require('multer');
// Variables of module
const router = express.Router();
const upload = multer({dest: './public/img/laporan/'});
// Local module
const daftarPembayaran = require('../controllers/kontrolerPembayaran');
const validasi = require('../middleware/validasiPembayaran');

// Router to render and switch directories in URL
// Index/home route
router.route('/')
    // All role can see
    .get(daftarPembayaran.tampilSeluruhnya)
    .post(upload.single('image'), validasi.uploadGambar(), daftarPembayaran.tambahPembayaran)
    .put(validasi.ubahSPP(), daftarPembayaran.tambahSPPsiswa)
    
module.exports = router