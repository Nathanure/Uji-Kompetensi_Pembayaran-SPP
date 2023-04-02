// Third-party module
const db = require('../middleware/manajemenDB');

// CRUD Functions
const akar = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        delete req.session.err;
        delete req.session.usernamePetugas;
        res.render('root/dasbor', {
            admin: req.session.admin,
            petugas: [],
            siswa: [],
            akunPetugas: await db.petugas(),
            akunSiswa: await db.siswa(),
            // query: {},
            title: 'Dasbor',
            layout: 'layout/dasbor',
        });
    // Dengan session petugas
    } else if(req.session.petugas) {
        delete req.session.err;
        delete req.session.usernamePetugas;
        res.render('root/dasbor', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            akunSiswa: await db.siswa(),
            // query: {},
            title: 'Dasbor',
            layout: 'layout/dasbor',
        });
    // Dengan session siswa
    } else if(req.session.siswa) {
        delete req.session.err;
        delete req.session.usernameSiswa;
        res.render('root/dasbor', {
            admin: [],
            petugas: [],
            siswa: req.session.siswa,
            pembayaran: await db.pembayaranSiswa(req.session.siswa[0].id_nis),
            // query: {},
            title: 'Dasbor',
            layout: 'layout/dasbor',
        });
    // Tanpa session
    } else {
        if (req.session.err) {
            res.render('root/masuk', {
                user: [],
                title: 'Masuk',
                layout: 'layout/hanya-konten',
                err: req.session.err,
                login: req.session.login,
                query: {}
            });
        } else {
            res.render('root/masuk', {
                user: [],
                title: 'Masuk',
                layout: 'layout/hanya-konten',
                err: [],
                login: [],
                query: {}
            });
        }
    }
}

const keluar = async (req, res) => {
    // Menghapus session
    // Bila telah masuk
    if (req.session.admin) delete req.session.admin; 
    if (req.session.petugas) delete req.session.petugas;
    if (req.session.siswa) delete req.session.siswa;
    res.redirect('/');
}

module.exports = {
    akar,
    keluar
}