// Modul pihak ketiga
const { validationResult } = require('express-validator');
// Modul lokal
const db = require('../middleware/manajemenDB');
const code = require('../middleware/status');
const manipulasi = require('../middleware/manipulasi');

// CRUD Functions
// SELECT
const tampilSeluruhnya = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        // Ketika ada query hapus saat ingin menghapus data
        if (req.query.hapus) {
            res.render('spp/daftarSPP', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                spp: await db.spp(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Daftar SPP',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menghapus dan mengubah akan menampilkan pesan
        } else if (req.query.nama) {
            res.render('spp/daftarSPP', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                spp: await db.spp(),
                query: {},
                err: [],
                berhasil: [{
                    id_spp: req.query.id,
                    tahun: req.query.nama
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                title: 'Daftar SPP',
                layout: 'layout/dasbor',
            });
        // Ketika belum ada query apapun
        } else {
            res.render('spp/daftarSPP', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                spp: await db.spp(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Daftar SPP',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session petugas
    } else if (req.session.petugas) {
        res.render('spp/daftarSPP', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            spp: await db.spp(),
            query: {},
            err: [],
            berhasil: [],
            title: 'Daftar SPP',
            layout: 'layout/dasbor',
        });
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// INSERT
const tambahSPP = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                // Membuat id_spp
                const id_spp = req.body.tingkat_kelas + req.body.tahun;
                // Menambah SPP
                const tambahSPP = await db.tambahDataSPP(id_spp, req.body.tahun, req.body.nominal);
                res.render('spp/daftarSPP', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    spp: await db.spp(),
                    berhasil: tambahSPP,
                    keterangan: 'Tambah',
                    lokasi: 'spp',
                    err: [],
                    query: {},
                    title: 'Daftar SPP',
                    layout: 'layout/dasbor',
                });
            } else {
                res.render('spp/daftarSPP', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    spp: await db.spp(),
                    berhasil: [],
                    err: errors,
                    query: {},
                    title: 'Daftar SPP',
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
            const hapusSPP = await db.hapusDataSPP(req.query.id);
            const dataResponse = [{
                id: hapusSPP[0].id_spp,
                nama: hapusSPP[0].tahun,
                keterangan: 'Hapus',
                lokasi: 'spp',
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
    tambahSPP,
    hapusSatu
}