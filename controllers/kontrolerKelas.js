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
            res.render('kelas/daftarKelas', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                jurusan: await db.jurusan(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Daftar Kelas',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menghapus dan mengubah akan menampilkan pesan
        } else if (req.query.nama) {
            res.render('kelas/daftarKelas', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                jurusan: await db.jurusan(),
                query: {},
                err: [],
                berhasil: [{
                    id_kelas: req.query.id,
                    nama_kelas: req.query.nama
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                title: 'Daftar Kelas',
                layout: 'layout/dasbor',
            });
        } else {
            res.render('kelas/daftarKelas', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                jurusan: await db.jurusan(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Daftar Kelas',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session petugas
    } else if (req.session.petugas) {
        res.render('kelas/daftarKelas', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            kelas: await db.kelas(),
            jurusan: await db.jurusan(),
            query: {},
            err: [],
            berhasil: [],
            title: 'Daftar Kelas',
            layout: 'layout/dasbor',
        });
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// INSERT
const tambahKelas = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                // Mengubah nama_jurusan menjadi id_jurusan
                const id_jurusan = await manipulasi.ubahIDJurusan(req.body.nama_jurusan);
                // Membuat id_kelas
                const id_kelas = await manipulasi.idKelas(req.body.tingkat_kelas, id_jurusan);
                // Membuat nama_kelas
                const nama_kelas = await manipulasi.namaKelas(req.body.tingkat_kelas, req.body.nama_jurusan);
                // Menambah kelas
                const tambahKelas = await db.tambahDataKelas(id_kelas, nama_kelas, id_jurusan);
                res.render('kelas/daftarKelas', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    kelas: await db.kelas(),
                    jurusan: await db.jurusan(),
                    berhasil: tambahKelas,
                    statusID: 'berhasil',
                    statusEN: 'success',
                    icon: 'check-circle-fill',
                    keterangan: 'Tambah',
                    lokasi: 'Kelas',
                    err: [],
                    query: {},
                    title: 'Daftar Kelas',
                    layout: 'layout/dasbor',
                });
            } else {
                res.render('kelas/daftarKelas', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    kelas: await db.kelas(),
                    jurusan: await db.jurusan(),
                    berhasil: [],
                    err: errors,
                    query: {},
                    title: 'Daftar Kelas',
                    layout: 'layout/dasbor',
                });
            }
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        res.status(401);
    }
}
// DELETE
const hapusSatu = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.query.id !== undefined) {
            const hapusKelas = await db.hapusDataKelas(req.query.id);
            const dataResponse = [{
                id: hapusKelas[0].id_kelas,
                nama: hapusKelas[0].nama_kelas,
                keterangan: 'Hapus',
                lokasi: 'kelas',
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
    tambahKelas,
    hapusSatu
}