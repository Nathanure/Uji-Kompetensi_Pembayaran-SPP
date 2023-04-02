// Import third-party module
const { body } = require('express-validator');
const db = require('./manajemenDB')

// Validasi login siswa
function jurusan() {
    return [
        // Username
        body('id_jurusan')
            .trim()
            .notEmpty()
            .withMessage('Harap isi ID Jurusan'),
        // Password
        body('nama_jurusan')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Jurusan'),
        // Query untuk mengecek adanya serta kecocokan username dan password
        body(['id_jurusan', 'nama_jurusan']).custom(async (nilai, { req }) => {
            const cekID = await db.validasiIDJurusan(req.body.id_jurusan);
            if (cekID) {
                const cek = await db.validasiJurusan(req.body.id_jurusan, req.body.nama_jurusan);
                if (cek) throw new Error('ID atau Jurusan sudah ada');
                throw new Error('ID Jurusan sudah ada');
            }
        })
    ]
}

module.exports = jurusan;