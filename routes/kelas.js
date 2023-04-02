// Import third-party module
const express = require('express');
// Variables of module
const router = express.Router();
// Local module
const daftarKelas = require('../controllers/kontrolerKelas')
const kelas = require('../middleware/validasiKelas')

// Router to render and switch directories in URL
// Index/home route
router.route('/')
    // All role can see
    .get(daftarKelas.tampilSeluruhnya)
    .post(kelas(), daftarKelas.tambahKelas)
    .delete(daftarKelas.hapusSatu)

module.exports = router