// Modul pihak ketiga
const { validationResult } = require('express-validator');
// Modul lokal
const db = require('../middleware/manajemenDB');
const code = require('../middleware/status');

// CRUD Functions
// SELECT
const tampilSeluruhnya = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        // Ketika ada query hapus saat ingin menghapus data
        if (req.query.hapus) {
            res.render('jurusan/daftarJurusan', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                jurusan: await db.jurusan(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Daftar Jurusan',
                layout: 'layout/dasbor',
            });
        // Ketika ada query ubah saat ingin mengubah data
        } else if (req.query.ubah) {  
            res.render('jurusan/daftarJurusan', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                jurusan: await db.jurusan(),
                query: req.query,
                value: await db.validasiIDJurusan(req.query.id),
                err: [],
                berhasil: [],
                title: 'Daftar Jurusan',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menghapus dan mengubah akan menampilkan pesan
        } else if (req.query.nama) {
            res.render('jurusan/daftarJurusan', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                jurusan: await db.jurusan(),
                query: {},
                err: [],
                berhasil: [{
                    id_jurusan: req.query.id,
                    nama_jurusan: req.query.nama
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                title: 'Daftar Jurusan',
                layout: 'layout/dasbor',
            });
        // Ketika belum ada query apapun
        } else {
            res.render('jurusan/daftarJurusan', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                jurusan: await db.jurusan(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Daftar Jurusan',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session petugas
    } else if (req.session.petugas) {
        res.render('jurusan/daftarJurusan', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            jurusan: await db.jurusan(),
            query: {},
            err: [],
            berhasil: [],
            title: 'Daftar Jurusan',
            layout: 'layout/dasbor',
        });
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// INSERT
const tambahJurusan = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                const tambahJurusan = await db.tambahDataJurusan(req.body.id_jurusan, req.body.nama_jurusan);
                res.render('jurusan/daftarJurusan', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    jurusan: await db.jurusan(),
                    berhasil: tambahJurusan,
                    keterangan: 'Tambah',
                    lokasi: 'jurusan',
                    err: [],
                    query: {},
                    title: 'Daftar Jurusan',
                    layout: 'layout/dasbor',
                });
            } else {
                res.render('jurusan/daftarJurusan', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    jurusan: await db.jurusan(),
                    berhasil: [],
                    value: req.body,
                    err: errors,
                    query: {},
                    title: 'Daftar Jurusan',
                    layout: 'layout/dasbor',
                });
            }
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// DELETE
const hapusSatu = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.query.id !== undefined) {
            const hapusJurusan = await db.hapusDataJurusan(req.query.id);
            const dataResponse = [{
                id: hapusJurusan[0].id_jurusan,
                nama: hapusJurusan[0].nama_jurusan,
                keterangan: 'Hapus',
                lokasi: 'jurusan',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// PUT
const ubahSatu = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.body !== undefined) {
            const ubahJurusan = await db.ubahDataJurusan(req.body.id_jurusan, req.body.nama_jurusan);
            const dataResponse = [{
                id: ubahJurusan[0].id_jurusan,
                nama: ubahJurusan[0].nama_jurusan,
                keterangan: 'Ubah',
                lokasi: 'jurusan',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}

module.exports = {
    tampilSeluruhnya,
    tambahJurusan,
    hapusSatu,
    ubahSatu
}