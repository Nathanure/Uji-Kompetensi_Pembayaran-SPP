// Import third-party module
const { body } = require('express-validator');
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

// Validasi login siswa
function kelas() {
    return [
        // Tingkat Kelas
        body('tingkat_kelas')
            .isIn([10, 11, 12])
            .withMessage('Harap memilih sesuai tingkatan yang ada'),
        // Nama Jurusan
        body('nama_jurusan')
            .custom(isInCustom((req) => namaJurusan(req)))
            .withMessage('Harap memilih sesuai nama jurusan yang ada'),
    ]
}

// Nama Jurusan di validasi untuk isIn
const namaJurusan = async (req) => {
    try {
        const nama_jurusan = await db.validasiNamaJurusan(req.body.nama_jurusan)
        .then(result => result.rows.map(row => row.nama_jurusan));
        return nama_jurusan;
    } catch (error) {
        console.error(error);
    }
}

module.exports = kelas;