// Import modul pihak ketigas
const express = require('express');
const router = express.Router();
// Import modul lokal
const login = require('../controllers/kontrolerAutentikasi')
const valid = require('../middleware/validasiAutentikasi')

// Ruter untuk merender dan mengganti arah di URL
// Rute login
router.route('/petugas')
    .post(valid.loginPetugas(), login.loginPetugas)
router.route('/siswa')
    .post(valid.loginSiswa(), login.loginSiswa)

module.exports = router
