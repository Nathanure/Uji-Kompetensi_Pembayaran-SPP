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

// Validasi registrasi akun
function tambahSiswa() {
    return [
        // NIS
        body('nis')
            .trim()
            .notEmpty()
            .withMessage('Harap isi NIS Siswa')
            .isInt({max:9999999999, allow_leading_zeroes: true})
            .withMessage('Format NIS harus berupa angka'),
        // NISN
        body('nisn')
            .trim()
            .notEmpty()
            .withMessage('Harap isi NISN Siswa')
            .isInt({max:9999999999, allow_leading_zeroes: true})
            .withMessage('Format NISN harus berupa angka'),
        // Nama
        body('nama_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Siswa')
            .isAlpha('en-US', {ignore: ' '})
            .withMessage('Format nama harus berupa huruf'),
        // Nama
        body('kelas_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Kelas Siswa')
            .custom(isInCustom((req) => namaKelas(req)))
            .withMessage('Harap memilih sesuai kelas yang ada'),
        // Nama
        body('alamat_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Alamat Siswa')
            .isString()
            .withMessage('Format alamat harus benar'),
        // Telpon
        body('telpon_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Telpon Siswa')
            .isMobilePhone('id-ID')
            .withMessage('Format telpon salah! Harap menggunakan nomor telpon Indonesia'),
        // Email
        body('email_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Email Siswa')
            .isEmail()
            .withMessage('Format email salah'),
            // Password
        body('password_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Password Siswa')
            .isStrongPassword({minLength: 10, minNumbers:10, minSymbols: 0, minLowercase: 0, minUppercase: 0})
            .withMessage('Harap isi password dengan nisn'),
        // Konfirmasi Password
        body('konfirmasi_password_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Konfirmasi Password')
            .custom(async (konfirmasi, {req}) => {
                // Tidak sama
                if (req.body.password_siswa !== konfirmasi) throw new Error(`Password dan konfirmasi password tidak sama`);
            }),
        // Query untuk mengecek kecocokan data siswa
        body(['nis', 'nisn']).custom(async (nilai, { req }) => {
            const cek = await db.validasiSiswaBaru(req.body.nis, req.body.nisn);
            if (cek) throw new Error('Siswa sudah ada, harap ubah NIS atau NISN');
        })
    ]
}
function ubahSiswa() {
    return [
        // NIS
        body('nis')
            .custom((async id => {
                const cek = await db.detailSiswa(id);
                if (cek === undefined) throw new Error('Harap untuk tidak mengubah data NIS melalui devTools');
            })),
        // NISN
        body('nisn')
            .trim()
            .notEmpty()
            .withMessage('Harap isi NISN Siswa')
            .isInt({max:9999999999, allow_leading_zeroes: true})
            .withMessage('Format NISN harus berupa angka'),
        // Nama
        body('nama_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Siswa')
            .isAlpha('en-US', {ignore: ' '})
            .withMessage('Format nama harus berupa huruf'),
        // Nama
        body('kelas_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Kelas Siswa')
            .custom(isInCustom((req) => namaKelas(req)))
            .withMessage('Harap memilih sesuai kelas yang ada'),
        // Nama
        body('alamat_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Alamat Siswa')
            .isString()
            .withMessage('Format alamat harus benar'),
        // Telpon
        body('telpon_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Telpon Siswa')
            .isMobilePhone('id-ID')
            .withMessage('Format telpon salah! Harap menggunakan nomor telpon Indonesia'),
        // Email
        body('email_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Email Siswa')
            .isEmail()
            .withMessage('Format email salah'),
        // Query untuk mengecek kecocokan data siswa
        body(['nisn', 'nama_petugas']).custom(async (nilai, { req }) => {
            const cek = await db.validasiSeluruhSiswa(req.body.nisn, req.body.nama_siswa, req.body.kelas_siswa, req.body.alamat_siswa, req.body.telpon_siswa, req.body.email_siswa);
            if (cek.length > 0) throw new Error('Siswa sudah ada, harap ubah data siswa');
        })
    ]
}
function ubahSiswa() {
    return [
        // NIS
        body('nis')
            .custom((async id => {
                const cek = await db.detailSiswa(id);
                if (cek === undefined) throw new Error('Harap untuk tidak mengubah data NIS melalui devTools');
            })),
        // NISN
        body('nisn')
            .trim()
            .notEmpty()
            .withMessage('Harap isi NISN Siswa')
            .isInt({max:9999999999, allow_leading_zeroes: true})
            .withMessage('Format NISN harus berupa angka'),
        // Nama
        body('nama_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Siswa')
            .isAlpha('en-US', {ignore: ' '})
            .withMessage('Format nama harus berupa huruf'),
        // Nama
        body('kelas_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Kelas Siswa')
            .custom(isInCustom((req) => namaKelas(req)))
            .withMessage('Harap memilih sesuai kelas yang ada'),
        // Nama
        body('alamat_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Alamat Siswa')
            .isString()
            .withMessage('Format alamat harus benar'),
        // Telpon
        body('telpon_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Telpon Siswa')
            .isMobilePhone('id-ID')
            .withMessage('Format telpon salah! Harap menggunakan nomor telpon Indonesia'),
        // Email
        body('email_siswa')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Email Siswa')
            .isEmail()
            .withMessage('Format email salah'),
        // Query untuk mengecek kecocokan data siswa
        body(['nisn', 'nama_petugas']).custom(async (nilai, { req }) => {
            const cek = await db.validasiSeluruhSiswa(req.body.nisn, req.body.nama_siswa, req.body.kelas_siswa, req.body.alamat_siswa, req.body.telpon_siswa, req.body.email_siswa);
            if (cek.length > 0) throw new Error('Siswa sudah ada, harap ubah data siswa');
        })
    ]
}

// Nama Kelas di validasi untuk isIn
const namaKelas = async (req) => {
    try {
        const kelas_siswa = await db.validasiNamaKelas(req.body.kelas_siswa)
        .then(result => result.rows.map(row => row.nama_kelas));
        return kelas_siswa;
    } catch (error) {
        console.error(error);
    }
}

// Validasi registrasi petugas
function tambahPetugas() {
    return [
        // Nama
        body('nama_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Petugas')
            .isAlpha('en-US', {ignore: ' '})
            .withMessage('Format nama harus berupa huruf'),
        // Username
        body('username_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Username Petugas')
            .isString()
            .withMessage('Format username salah'),   
        // Email
        body('email_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Email Petugas')
            .isEmail()
            .withMessage('Format email salah'),
        // Telpon
        body('telpon_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Telpon Petugas')
            .isMobilePhone('id-ID')
            .withMessage('Format telpon salah! Harap menggunakan nomor telpon Indonesia'),
        // Password
        body('password_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Password Petugas')
            .isStrongPassword()
            .withMessage('Harap isi password dengan kombinasi dari angka, huruf kecil dan besar, serta simbol. Minimal dari 8 karakter. Contoh: "Abcde1@gmail.com"'),    
        // Konfirmasi Password
        body('konfirmasi_password_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Konfirmasi Password')
            .custom(async (konfirmasi, {req}) => {
                // Tidak sama
                if (req.body.password_petugas !== konfirmasi) throw new Error(`Password dan konfirmasi password tidak sama`);
            }),
        // Query untuk mengecek kecocokan data petugas
        body(['nama_petugas', 'email_petugas']).custom(async (nilai, { req }) => {
            const cek = await db.validasiPetugasBaru(req.body.nama_petugas, req.body.email_petugas, req.body.username_petugas);
            if (cek) throw new Error('Petugas sudah ada, harap ubah nama, username, atau email petugas');
        })
    ]
}
function ubahPetugas() {
    return [
        // ID
        body('id_petugas')
            .custom((async id => {
                const cek = await db.detailPetugas(id);
                if (cek === undefined) throw new Error('Harap untuk tidak mengubah data id_petugas melalui devTools');
            })),
        // Nama
        body('nama_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Nama Petugas')
            .isAlpha('en-US', {ignore: ' '})
            .withMessage('Format nama harus berupa huruf'),
        // Username
        body('username_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Username Petugas')
            .isString()
            .withMessage('Format username salah'),   
        // Email
        body('email_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Email Petugas')
            .isEmail()
            .withMessage('Format email salah'),
        // Telpon
        body('telpon_petugas')
            .trim()
            .notEmpty()
            .withMessage('Harap isi Telpon Petugas')
            .isMobilePhone('id-ID')
            .withMessage('Format telpon salah! Harap menggunakan nomor telpon Indonesia'),
        // Query untuk mengecek kecocokan data petugas
        body(['nama_petugas', 'email_petugas']).custom(async (nilai, { req }) => {
            const cek = await db.validasiSeluruhPetugas(req.body.nama_petugas, req.body.username_petugas, req.body.email_petugas, req.body.telpon_petugas);
            if (cek.length > 0) throw new Error('Petugas sudah ada, harap ubah data petugas');
        })
    ]
}

module.exports = {
    tambahSiswa,
    tambahPetugas,
    ubahSiswa,
    ubahPetugas
}