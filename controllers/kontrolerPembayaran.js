// Modul built-in
const fs = require('fs');
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
        // Ketika belum ada query apapun
        if (req.query.ubah) {
            res.render('pembayaran/daftarPembayaran', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                spp: await db.tahunSPP(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        } else if (req.query.nominal) {
            res.render('pembayaran/daftarPembayaran', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                spp: await db.tahunSPP(),
                query: {},
                err: [],
                berhasil: [{
                    id_spp: req.query.nama,
                    nama: await db.detailSiswa(req.query.id),
                    nominal: req.query.nominal
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                hal: req.query.hal,
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        } else {
            res.render('pembayaran/daftarPembayaran', {
                admin: req.session.admin,
                petugas: [],
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session lainnya dan tanpa session
    } else if(req.session.petugas) {
        // Ketika belum ada query apapun
        if (req.query.ubah) {
            res.render('pembayaran/daftarPembayaran', {
                admin: [],
                petugas: req.session.petugas,
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                spp: await db.tahunSPP(),
                query: req.query,
                err: [],
                berhasil: [],
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        } else if (req.query.nominal) {
            res.render('pembayaran/daftarPembayaran', {
                admin: [],
                petugas: req.session.petugas,
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                spp: await db.tahunSPP(),
                query: {},
                err: [],
                berhasil: [{
                    id_spp: req.query.nama,
                    nama: await db.detailSiswa(req.query.id),
                    nominal: req.query.nominal
                }],
                keterangan: req.query.keterangan,
                lokasi: req.query.lokasi,
                hal: req.query.hal,
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        } else {
            res.render('pembayaran/daftarPembayaran', {
                admin: [],
                petugas: req.session.petugas,
                siswa: [],
                SPPsiswa: await db.SPPsiswa(),
                query: {},
                err: [],
                berhasil: [],
                title: 'Pembayaran',
                layout: 'layout/dasbor',
            });
        }
    // Dengan session lainnya dan tanpa session
    } else if (req.session.siswa) {
        const pembayaran_masuk = await db.pembayaranSiswaMasuk(req.session.siswa[0].id_nis);
        const pembayaran_keluar = await db.pembayaranSiswaKeluar(req.session.siswa[0].id_nis);
        // // Format waktu ke Indonesia
        // waktu.locale('id');
        // // Mengubah tanggal menjadi format ke waktu indonesia
        // const a = pembayaran_masuk.map(data => data.tgl_bayar_masuk);
        // const b = pembayaran_keluar.map(data => data.tgl_bayar_keluar);
        // console.log(...a);
        // console.log(...b);
        // // const tgl_masuk = waktu(pembayaran_masuk[0].tgl_bayar_masuk).format('DD-MM-YYYY HH:mm:ss');
        // const tgl_masuk = waktu(a).format('DD-MM-YYYY HH:mm:ss');
        // console.log(tgl_masuk);
        // const tgl_keluar = waktu(...b).format('DD-MM-YYYY HH:mm:ss');
        // console.log(tgl_keluar);
        // pembayaran_masuk.filter(data => data.tgl_bayar_masuk = tgl_masuk);
        // pembayaran_keluar.filter(data => data.tgl_bayar_keluar = tgl_keluar);
        // // Mengubah waktu menjadi format 121231 atau YYMMDD 
        // const a = pembayaran_masuk.filter(data => data.tgl_bayar_masuk = tgl_masuk);
        // const b = pembayaran_keluar.filter(data => data.tgl_bayar_keluar = tgl_keluar);
        res.render('pembayaran/pembayaranSiswa', {
            admin: [],
            petugas: [],
            siswa: req.session.siswa,
            pembayaran: await db.pembayaranSiswa(req.session.siswa[0].id_nis),
            pembayaranMasuk: pembayaran_masuk,
            pembayaranKeluar: pembayaran_keluar,
            query: {},
            err: [],
            berhasil: [],
            title: 'Pembayaran',
            layout: 'layout/dasbor',
        });
    } else {
        code.status401(req, res);
    }
}
// INSERT
const tambahPembayaran = async (req, res) => {
    // Dengan session admin
    if(req.session.siswa) {
        try {
            let errors = validationResult(req).array({ onlyFirstError: true });
            const pembayaran_masuk = await db.pembayaranSiswaMasuk(req.session.siswa[0].id_nis)
            const pembayaran_keluar = await db.pembayaranSiswaKeluar(req.session.siswa[0].id_nis)
            // Format waktu ke Indonesia
            waktu.locale('id');
            // Mengubah tanggal menjadi format ke waktu indonesia        
            const tgl_masuk = waktu(pembayaran_masuk.map(data => data.tgl_bayar_masuk)).format('DD-MM-YYYY HH:mm:ss');
            const tgl_keluar = waktu(pembayaran_keluar.map(data => data.tgl_bayar_keluar)).format('DD-MM-YYYY HH:mm:ss');
            // Mengubah waktu menjadi format 121231 atau YYMMDD
            pembayaran_masuk.map(data => data.tgl_bayar_masuk = tgl_masuk);
            pembayaran_keluar.map(data => data.tgl_bayar_keluar = tgl_keluar);
            if (errors < 1) {
                // Memindahkan file dari lokasi sementara ke lokasi permanen
                fs.rename(req.file.path, './public/img/laporan/' + req.file.filename, (err) => {
                    if (err) throw err;
                });
                // Mengubah waktu menjadi ke Indonesia
                waktu.locale('id');
                // Mengubah waktu menjadi format 121231 atau YYMMDD
                const tgl = waktu().format('YYMMDD');
                // Membuat ID Pembayaran
                const id_pembayaran = await manipulasi.idPembayaran(tgl);
                // Memasukan data pembayaran
                const kirimLaporan = await db.tambahPembayaran(id_pembayaran, req.file.filename, req.file.originalname, req.session.siswa[0].id_nis);
                res.render('pembayaran/pembayaranSiswa', {
                    admin: [],
                    petugas: [],
                    siswa: req.session.siswa,
                    pembayaran: await db.pembayaranSiswa(req.session.siswa[0].id_nis),
                    pembayaranMasuk: pembayaran_masuk,
                    pembayaranKeluar: pembayaran_keluar,
                    berhasil: kirimLaporan,
                    keterangan: 'Kirim',
                    lokasi: 'pembayaran',
                    hal: 'laporan pembayaran',
                    err: [],
                    query: {},
                    title: 'Pembayaran',
                    layout: 'layout/dasbor',
                });
            } else {
                res.render('pembayaran/pembayaranSiswa', {
                    admin: [],
                    petugas: [],
                    siswa: req.session.siswa,
                    pembayaran: await db.pembayaranSiswa(req.session.siswa[0].id_nis),
                    pembayaranMasuk: pembayaran_masuk,
                    pembayaranKeluar: pembayaran_keluar,
                    berhasil: [],
                    err: errors,
                    query: {},
                    title: 'Pembayaran',
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
const tambahSPPsiswa = async (req, res) => {
    // Dengan session admin
    if(req.session.admin || req.session.petugas) {
        if (req.body !== undefined) {
            const ambilNominalSPP = await manipulasi.ubahIDSPP(req.body.kelas, req.body.tahun);
            const ubahSPPsiswa = await db.ubahSPPsiswa(req.body.kelas + req.body.tahun, ambilNominalSPP, req.body.nis);
            const dataResponse = [{
                id: req.body.nis,
                spp: ubahSPPsiswa[0].id_spp,
                nominal: ubahSPPsiswa[0].debet,
                keterangan: 'Tambah',
                lokasi: 'pembayaran',
                hal: 'spp siswa',
            }]
            res.json(dataResponse);
        }
    // Dengan session lainnya dan tanpa session
    } else {
        code.status401(req, res);
    }
}
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
    tambahPembayaran,
    tambahSPPsiswa,
    hapusSatu,
    ubahSatu
}