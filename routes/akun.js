// Mengambil modul pihak ketiga
const express = require('express');
// Mengubah express menjadi router
const router = express.Router();
// Modul lokal
const daftarAkun = require('../controllers/kontrolerAkun');
const validasi = require('../middleware/validasiAkun');

// Ruter untuk render dan berganti URL
// Rute awal
router.route('/')
    .get(daftarAkun.tampilSeluruhnya)
// Rute untuk post dan delete siswa dari rute awal
router.route('/siswa')
    .post(validasi.tambahSiswa(), daftarAkun.tambahSiswa)
    .delete(daftarAkun.hapusSiswa)
    .put(daftarAkun.ubahNIS)
// Rute untuk post dan delete petugas dari rute awal
router.route('/petugas')
    .post(validasi.tambahPetugas(), daftarAkun.tambahPetugas)
    .delete(daftarAkun.hapusPetugas)
// Rute petugas dan siswa detail
router.route('/:id')
    .get(daftarAkun.tampilDetail);
// Rute mengubah petugas dan siswa detail dengan post
router.route('/:id/siswa')
    .post(validasi.ubahSiswa(), daftarAkun.ubahSiswa);
router.route('/:id/petugas')
    .post(validasi.ubahPetugas(), daftarAkun.ubahPetugas);
    
module.exports = router