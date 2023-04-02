// Modul pihak ketiga
const { validationResult } = require('express-validator');
const waktu = require('moment');
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
            res.render('akun/daftarAkun', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                akunPetugas: await db.petugas(),
                akunSiswa: await db.siswa(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Daftar Jurusan',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menghapus dan mengubah akan menampilkan pesan
        } else if (req.query.error) {
            res.render('akun/daftarAkun', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                akunPetugas: await db.petugas(),
                akunSiswa: await db.siswa(),
                query: {},
                berhasil: [],
                value: JSON.parse(req.query.value),
                err: JSON.parse(req.query.error),
                title: 'Daftar Akun',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menambah akan menampilkan pesan
        } else if (req.query.berhasil) {
            res.render('akun/daftarAkun', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                akunPetugas: await db.petugas(),
                akunSiswa: await db.siswa(),
                query: {},
                err: [],
                berhasil: JSON.parse(req.query.berhasil),
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                title: 'Daftar Akun',
                layout: 'layout/dasbor',
            });
        // Ketika setelah menghapus dan mengubah akan menampilkan pesan
        } else if (req.query.nama) {
            res.render('akun/daftarAkun', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                akunPetugas: await db.petugas(),
                akunSiswa: await db.siswa(),
                query: {},
                err: [],
                berhasil: [{
                    id_petugas: req.query.id,
                    nama_petugas: req.query.nama
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                title: 'Daftar Akun',
                layout: 'layout/dasbor',
            });
        // Ketika belum ada query apapun
        } else {
            res.render('akun/daftarAkun', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                kelas: await db.kelas(),
                akunPetugas: await db.petugas(),
                akunSiswa: await db.siswa(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Daftar Akun',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session petugas
    } else if(req.session.petugas) {
        res.render('akun/daftarAkun', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            akunSiswa: await db.siswa(),
            title: 'Daftar Siswa',
            layout: 'layout/dasbor',
        });
    // Dengan session siswa atau tanpa session
    } else {
        code.status401(req, res);
    }
}
const tampilDetail = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        // Bila parameter ID berupa nis
        if (req.params.id.length < 11) {
            // Mengambil data tgl_buat dan mengubahnya agar mengembalikan format waktu biasa
            const siswa = await db.detailSiswa(req.params.id);
            // Format waktu ke Indonesia
            waktu.locale('id');
            // Mengubah tgl_buat menjadi format ke waktu indonesia
            const tgl = waktu(siswa.tgl_buat).format('dddd, D MMMM YYYY');
            siswa.tgl_buat = tgl;
            if (req.query.error) {
                res.render('akun/detailDaftarSiswa', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    kelas: await db.kelas(),
                    akun: siswa,
                    query: req.query,
                    value: JSON.parse(req.query.value),
                    err: JSON.parse(req.query.error),
                    berhasil: [],
                    title: 'Detail Siswa',
                    layout: 'layout/dasbor',
                });
            // Ketika setelah menambah akan menampilkan pesan
            } else if (req.query.berhasil) {
                res.render('akun/detailDaftarSiswa', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    kelas: await db.kelas(),
                    akun: siswa,
                    query: {},
                    err: [],
                    berhasil: JSON.parse(req.query.berhasil),
                    keterangan: req.query.keterangan,
                    lokasi: req.query.lokasi,
                    title: 'Detail Siswa',
                    layout: 'layout/dasbor',
                });
            // Ketika belum ada query apapun
            } else {
                res.render('akun/detailDaftarSiswa', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    kelas: await db.kelas(),
                    akun: siswa,
                    query: {},
                    err: [],
                    berhasil: [],
                    title: 'Detail Siswa',
                    layout: 'layout/dasbor',
                });
            }
        // Bila parameter ID berupa UUID
        } else {
            // Mengambil data tgl_buat dan mengubahnya agar mengembalikan format waktu biasa
            const petugas = await db.detailPetugas(req.params.id);
            // Format waktu ke Indonesia
            waktu.locale('id');
            // Mengubah tgl_buat menjadi format ke waktu indonesia
            const tgl = waktu(petugas.tgl_buat).format('dddd, D MMMM YYYY');
            petugas.tgl_buat = tgl;
            if (req.query.error) {
                res.render('akun/detailDaftarPetugas', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    akun: petugas,
                    query: req.query,
                    value: JSON.parse(req.query.value),
                    err: JSON.parse(req.query.error),
                    berhasil: [],
                    title: 'Detail Petugas',
                    layout: 'layout/dasbor',
                });
            // Ketika setelah menambah akan menampilkan pesan
            } else if (req.query.berhasil) {
                res.render('akun/detailDaftarPetugas', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    akun: petugas,
                    query: {},
                    err: [],
                    berhasil: JSON.parse(req.query.berhasil),
                    keterangan: req.query.keterangan,
                    lokasi: req.query.lokasi,
                    title: 'Detail Petugas',
                    layout: 'layout/dasbor',
                });
            // Ketika belum ada query apapun
            } else {
                res.render('akun/detailDaftarPetugas', {
                    admin: req.session.admin,
                    petugas: [],
                    siswa: [],
                    akun: petugas,
                    query: {},
                    err: [],
                    berhasil: [],
                    title: 'Detail Petugas',
                    layout: 'layout/dasbor',
                });
            }
        }
    // Dengan session petugas
    } else if (req.session.petugas) {
        res.render('akun/detailDaftarSiswa', {
            admin: [],
            petugas: req.session.petugas,
            siswa: [],
            akun: await db.detailSiswa(req.params.id),
            query: {},
            err: [],
            berhasil: [],
            title: 'Detail Siswa',
            layout: 'layout/dasbor',
        });
    // Dengan session siswa atau tanpa session
    } else {
        code.status401(req, res);
    }
}
// INSERT
const tambahPetugas = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                const tambahPetugas = await db.tambahDataPetugas(req.body.nama_petugas, req.body.username_petugas, req.body.password_petugas, req.body.email_petugas, req.body.telpon_petugas);
                res.redirect(`/akun?berhasil=${JSON.stringify(tambahPetugas)}&keterangan=Buat&lokasi=petugas`);
            } else res.redirect(`/akun?error=${JSON.stringify(errors)}&value=${JSON.stringify(req.body)}`);
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
const tambahSiswa = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                // Mengubah nama kelas menjadi ID kelas
                const idKelas = await manipulasi.ubahIDKelas(req.body.kelas_siswa);
                // Menambah data siswa
                const tambahSiswa = await db.tambahDataSiswa(req.body.nis, req.body.nisn, req.body.nama_siswa, idKelas, req.body.alamat_siswa, req.body.telpon_siswa, req.body.email_siswa, req.body.password_siswa);
                res.redirect(`/akun?berhasil=${JSON.stringify(tambahSiswa)}&keterangan=Buat&lokasi=siswa`);
            } else res.redirect(`/akun?error=${JSON.stringify(errors)}&value=${JSON.stringify(req.body)}`);
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// DELETE
const hapusPetugas = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.query.id !== undefined) {
            const hapusPetugas = await db.hapusDataPetugas(req.query.id);
            const dataResponse = [{
                id: hapusPetugas[0].id_petugas,
                nama: hapusPetugas[0].nama_petugas,
                keterangan: 'Hapus',
                lokasi: 'petugas',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
const hapusSiswa = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.query.id !== undefined) {
            const hapusSiswa = await db.hapusDataSiswa(req.query.id);
            const dataResponse = [{
                id: hapusSiswa[0].id_nis,
                nama: hapusSiswa[0].nama_siswa,
                keterangan: 'Hapus',
                lokasi: 'siswa',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
// PUT
const ubahNIS = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        if (req.body !== undefined) {
            const ubahNIS = await db.ubahNIS(req.body.nis, req.body.nisn);
            const dataResponse = [{
                id: ubahNIS[0].id_nis,
                nama: req.body.nama,
                keterangan: 'Ubah',
                lokasi: 'siswa',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
const ubahSiswa = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                // Mengubah nama kelas menjadi ID kelas
                const idKelas = await manipulasi.ubahIDKelas(req.body.kelas_siswa);
                // Mengubah data siswa
                const ubahSiswa = await db.ubahDataSiswa(req.body.nis, req.body.nisn, req.body.nama_siswa, idKelas, req.body.alamat_siswa, req.body.telpon_siswa, req.body.email_siswa);
                res.redirect(`/akun/${req.body.nis}?berhasil=${JSON.stringify(ubahSiswa)}&keterangan=Ubah&lokasi=siswa`);
            } else res.redirect(`/akun/${req.body.nis}?error=${JSON.stringify(errors)}&value=${JSON.stringify(req.body)}&modal=ubahSiswa`);
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
const ubahPetugas = async (req, res) => {
    // Dengan session admin
    if(req.session.admin) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            if (errors < 1) {
                // Mengubah data petugas
                const ubahPetugas = await db.ubahDataPetugas(req.body.id_petugas, req.body.nama_petugas, req.body.username_petugas, req.body.email_petugas, req.body.telpon_petugas);
                res.redirect(`/akun/${req.body.id_petugas}?berhasil=${JSON.stringify(ubahPetugas)}&keterangan=Ubah&lokasi=petugas`);
            } else res.redirect(`/akun/${req.body.id_petugas}?error=${JSON.stringify(errors)}&value=${JSON.stringify(req.body)}&modal=ubahPetugas`);
        } catch (error) {
            console.error(error);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}

module.exports = {
    tampilSeluruhnya,
    tampilDetail,
    tambahPetugas,
    tambahSiswa,
    hapusPetugas,
    hapusSiswa,
    ubahNIS,
    ubahSiswa,
    ubahPetugas
}