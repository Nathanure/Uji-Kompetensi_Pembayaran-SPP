// Import third-party module
const express = require('express');
// Variables of module
const router = express.Router();
// Local module
const daftarJurusan = require('../controllers/kontrolerJurusan')
const jurusan = require('../middleware/validasiJurusan')

// Ruter untuk menampilkan dan mengganti URL
// Rute Jurusan
router.route('/')
    .get(daftarJurusan.tampilSeluruhnya)
    .post(jurusan(), daftarJurusan.tambahJurusan)
    .delete(daftarJurusan.hapusSatu)
    .put(daftarJurusan.ubahSatu)
    
module.exports = router