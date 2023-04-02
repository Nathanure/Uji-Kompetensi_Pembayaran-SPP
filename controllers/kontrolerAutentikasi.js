// Third-party module
const { validationResult } = require('express-validator');
const db = require('../middleware/manajemenDB');

// POST login siswa
const loginSiswa = async (req, res) => {
    try {
        let errors = validationResult(req).array({ onlyFirstError: true });
        if (errors < 1) {
            // Siswa yang terautentikasi akan mendapat session
            const siswa = await db.ambilAkunSiswa(req.body.usernameSiswa, req.body.passwordSiswa);
            req.session.siswa = siswa;
            res.redirect('/');
        } else {
            req.session.login = req.body.usernameSiswa;
            req.session.err = errors;
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
    }
}
// POST login petugas
const loginPetugas = async (req, res) => {
    try {
        let errors = validationResult(req).array({ onlyFirstError: true });
        if (errors < 1) {
            const akunPetugas = await db.ambilAkunPetugas(req.body.usernamePetugas, req.body.passwordPetugas);
            // Admin yang terautentikasi akan mendapat session
            if (akunPetugas[0].tingkatan === 'admin') {
                req.session.admin = akunPetugas;
                res.redirect('/');
            }
            // Petugas yang terotitentikasi akan mendapat session
            if (akunPetugas[0].tingkatan === 'petugas') {
                req.session.petugas = akunPetugas;
                res.redirect('/');
            }
        } else {
            req.session.login = req.body.usernamePetugas;
            req.session.err = errors;
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    loginSiswa,
    loginPetugas,
}