// Import third-party module
const { body } = require('express-validator');
const db = require('./manajemenDB')

// Validasi login siswa
function loginSiswa() {
    return [
        // Username
        body('usernameSiswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi username'),
        // Password
        body('passwordSiswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi password'),
        // Query untuk mengecek adanya serta kecocokan username dan password
        body(['usernameSiswa', 'passwordSiswa']).custom(async (nilai, { req }) => {
            const cek = await db.validasiLoginSiswa(req.body.usernameSiswa, req.body.passwordSiswa);
            if (cek === undefined) throw new Error('Username atau password salah');
        })
    ]
}

// Validasi login petugas
function loginPetugas() {
    return [
        // Username
        body('usernamePetugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi username'),
        // Password
        body('passwordPetugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi password'),
        // Query untuk mengecek adanya serta kecocokan username dan password
        body(['usernamePetugas', 'passwordPetugas']).custom(async (nilai, { req }) => {
            const cek = await db.validasiLoginPetugas(req.body.usernamePetugas, req.body.passwordPetugas);
            if (cek === undefined) throw new Error('Username atau password salah');
        })
    ]
}

module.exports = {
    loginSiswa,
    loginPetugas
}