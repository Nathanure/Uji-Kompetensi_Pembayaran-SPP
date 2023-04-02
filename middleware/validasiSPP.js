// Import third-party module
const { body } = require('express-validator');
const db = require('./manajemenDB');

// Membuat tahun
const tahun = (awal, akhir) => {
    const bungkus = [];
    for (let tahun = akhir; tahun >= awal; tahun--) bungkus.push(tahun);
    return bungkus;
}

// Validasi login siswa
function spp() {
    return [
        // Tingkat Kelas
        body('tingkat_kelas')
            .isIn([10, 11, 12])
            .withMessage('Harap memilih sesuai tingkatan yang ada'),
        // Tahun
        body('tahun')
            .isIn(tahun(1970, 2099))
            .withMessage('Harap memilih sesuai tahun yang ada'),
        // Nominal
        body('nominal')
            .trim()
            .notEmpty()
            .withMessage('Masukan nominal SPP')
            .isCurrency({
                symbol: 'Rp',
                thousands_separator: '',
                require_symbol: false,
                require_decimal: false,
                allow_negatives: false,
            })
            .withMessage('Harap masukan nominal dengan mata uang Rupiah')
            .isInt({min:50000, max: 99999999})
            .withMessage('Nominal Uang tidak boleh kurang dari Rp50000 dan lebih dari Rp100000000'),
        // Query untuk mengecek data SPP yang sudah ada
        body(['tingkat_kelas', 'tahun', 'nominal']).custom(async (nilai, { req }) => {
            const cekID = await db.validasiIDSPP(req.body.tingkat_kelas + req.body.tahun);
            if (cekID) throw new Error(`SPP untuk kelas ${req.body.tingkat_kelas} pada tahun ${req.body.tahun} sudah ada`);
        })
    ]
}

module.exports = spp;