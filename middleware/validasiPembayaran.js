// Import third-party module
const { body, check } = require('express-validator');
const db = require('./manajemenDB')

// isIn with callback
const isInCustom = (callback) => {
    return async (value, { req }) => {
        const allowedValues = await callback(req);
        if (!allowedValues.includes(value)) {
            throw new Error('Pilih sesuai dengan pilihan yang ada');
        }
    }
}

// Validasi SPP siswa
function ubahSPP() {
    return [
        // ID
        body('nis')
            .custom((async id => {
                const cek = await db.detailSiswa(id);
                if (cek === undefined) throw new Error('Harap untuk tidak mengubah data id_petugas melalui devTools');
            })),
        // Tingkat Kelas
        body('tingkat_kelas')
            .isIn([10, 11, 12])
            .withMessage('Harap memilih sesuai tingkatan yang ada'),
        // Tahun SPP
        body('tahun')
            .custom(isInCustom((req) => tahunSPP(req)))
            .withMessage('Harap memilih sesuai tahun yang ada'),
        // Query untuk mengecek kecocokan data petugas
        // body(['nama_petugas', 'email_petugas']).custom(async (nilai, { req }) => {
        //     const cek = await db.validasiSeluruhPetugas(req.body.nama_petugas, req.body.username_petugas, req.body.email_petugas, req.body.telpon_petugas);
        //     if (cek.length > 0) throw new Error('Petugas sudah ada, harap ubah data petugas');
        // })
    ]
}

// Nama Kelas di validasi untuk isIn
const tahunSPP = async (req) => {
    try {
        const tahun_spp = await db.validasiTahunSPP(req.body.tahun)
        .then(result => result.rows.map(row => row.tahun));
        return tahun_spp;
    } catch (error) {
        console.error(error);
    }
}

function uploadGambar() {
    return [
        // Validasi gambar pembayaran SPP
        // File gambar
        check('image').custom((image, { req }) => {
            if (!req.file) throw new Error("Harap masukan gambar");
            if (!req.file.mimetype.startsWith("image/")) throw new Error("File yang dimasukan harus berupa gambar");
            if (req.file.size > (5 * 1024 * 1024)) throw new Error('Batas gambar maksimal 5MB');
            return true;
        })
    ]
}

module.exports = {
    ubahSPP,
    uploadGambar
}