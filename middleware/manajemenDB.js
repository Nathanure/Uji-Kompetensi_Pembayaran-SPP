// Import third-party module
const pool = require('../config/db');

// Login
// Memanggil data untuk session
const ambilAkunSiswa = async (username, password) => {
    const { rows: akunSiswa } = await pool.query(`SELECT * FROM "v_Siswa" WHERE id_nis = '${username}' AND password = crypt('${password}', password)`);
    return akunSiswa;
}

// Memanggil data untuk session
const ambilAkunPetugas = async (username, password) => {
    const { rows: akunPetugas } = await pool.query(`SELECT * FROM petugas WHERE username = '${username}' AND password = crypt('${password}', password)`);
    return akunPetugas;
}

// Dasbor utama
// Global

// Admin && Petugas
// Jurusan
const jurusan = async () => {
    const { rows: jurusan } = await pool.query(`SELECT * FROM jurusan ORDER BY id_jurusan ASC`);
    return jurusan;
}
const validasiIDJurusan = async (id) => {
    const { rows: [validasiIDJurusan] } = await pool.query(`SELECT * FROM jurusan WHERE id_jurusan = ${id}`);
    return validasiIDJurusan;
}
const validasiJurusan = async (id, nama) => {
    const { rows: [validasiJurusan] } = await pool.query(`SELECT * FROM jurusan WHERE id_jurusan = ${id} AND nama_jurusan = '${nama}'`);
    return validasiJurusan;
}
const tambahDataJurusan = async (id, nama) => {
    const { rows: tambah } = await pool.query(`INSERT INTO jurusan VALUES (${id}, '${nama}') RETURNING *`);
    return tambah;
}
const hapusDataJurusan = async (id) => {
    const { rows: hapus } = await pool.query(`DELETE FROM jurusan WHERE id_jurusan = ${id} RETURNING *`);
    return hapus;
}
const ubahDataJurusan = async (id, nama) => {
    const { rows: ubah } = await pool.query(`UPDATE jurusan SET nama_jurusan = '${nama}' WHERE id_jurusan = ${id} RETURNING *`);
    return ubah;
}
// Kelas
const kelas = async () => {
    const { rows: kelas } = await pool.query(`SELECT kelas.*, jurusan.nama_jurusan FROM kelas JOIN jurusan ON kelas.id_jurusan = jurusan.id_jurusan ORDER BY id_kelas`);
    return kelas;
}
const validasiNamaJurusan = async (nama) => {
    const validasiNamaJurusan = await pool.query(`SELECT nama_jurusan FROM jurusan WHERE nama_jurusan = '${nama}'`);
    return validasiNamaJurusan;
}
const sepertiIDKelas = async (tingkat_jurusan) => {
    const { rows: sepertiIDKelas } = await pool.query(`SELECT id_kelas FROM kelas WHERE id_kelas LIKE '${tingkat_jurusan}%'`);
    return sepertiIDKelas;
}
const sepertiNamaKelas = async (tingkat_jurusan) => {
    const { rows: sepertiIDKelas } = await pool.query(`SELECT nama_kelas FROM kelas WHERE nama_kelas LIKE '${tingkat_jurusan}%'`);
    return sepertiIDKelas;
}
const tambahDataKelas = async (id, kelas, id_jurusan) => {
    const { rows: tambah } = await pool.query(`INSERT INTO kelas VALUES ('${id}', '${kelas}', '${id_jurusan}') RETURNING *`);
    return tambah;
}
const hapusDataKelas = async (id) => {
    const { rows: hapus } = await pool.query(`DELETE FROM kelas WHERE id_kelas = '${id}' RETURNING *`);
    return hapus;
}
// SPP
const spp = async () => {
    const { rows: spp } = await pool.query(`SELECT * FROM spp`);
    return spp;
}
const validasiIDSPP = async (id) => {
    const { rows: [validasiIDSPP] } = await pool.query(`SELECT * FROM spp WHERE id_spp = '${id}'`);
    return validasiIDSPP;
}
const tambahDataSPP = async (id, tahun, nominal) => {
    const { rows: tambah } = await pool.query(`INSERT INTO spp VALUES ('${id}', '${tahun}', '${nominal}') RETURNING *`);
    return tambah;
}
const hapusDataSPP = async (id) => {
    const { rows: hapus } = await pool.query(`DELETE FROM spp WHERE id_spp = '${id}' RETURNING *`);
    return hapus;
}
// Petugas
const petugas = async () => {
    const { rows: petugas } = await pool.query(`SELECT * FROM "v_Petugas"`);
    return petugas;
}
const validasiLoginPetugas = async (username, password) => {
    const { rows: [adaPetugas] } = await pool.query(`SELECT id_petugas FROM petugas WHERE username = '${username}' AND password = crypt('${password}', password)`);
    return adaPetugas;
}
const validasiPetugasBaru = async (nama, email, username) => {
    const { rows: [petugas] } = await pool.query(`SELECT id_petugas FROM petugas WHERE nama_petugas = '${nama}' OR email = '${email}' OR username = '${username}'`);
    return petugas;
}
const tambahDataPetugas = async (nama, username, password, email, telpon) => {
    const { rows: tambah } = await pool.query(`INSERT INTO petugas (nama_petugas, username, password, email, telp, tgl_buat) VALUES ('${nama}', '${username}', crypt('${password}', gen_salt('bf', 10)), '${email}', '${telpon}', now()) RETURNING *`);
    return tambah;
}
const hapusDataPetugas = async (id) => {
    const { rows: hapus } = await pool.query(`DELETE FROM petugas WHERE id_petugas = '${id}' RETURNING *`);
    return hapus;
}
// Detail Petugas
const detailPetugas = async (id) => {
    const { rows: [petugas] } = await pool.query(`SELECT * FROM "v_Petugas" WHERE id_petugas = '${id}'`);
    return petugas;
}
const ubahDataPetugas = async (id, nama, username, email, telpon) => {
    const { rows: ubah } = await pool.query(`UPDATE petugas SET nama_petugas = '${nama}', username = '${username}', email = '${email}', telp = '${telpon}' WHERE id_petugas = '${id}' RETURNING *`);
    return ubah;
}
const validasiSeluruhPetugas = async (nama, username, email, telpon) => {
    const { rows: petugas } = await pool.query(`SELECT id_petugas FROM "v_Petugas" WHERE nama = '${nama}' AND username = '${username}' AND email = '${email}' AND telp = '${telpon}'`);
    return petugas;
}
// Siswa
const siswa = async () => {
    const { rows: siswa } = await pool.query(`SELECT * FROM "v_Siswa"`);
    return siswa;
}
const validasiLoginSiswa = async (username, password) => {
    const { rows: [adaSiswa] } = await pool.query(`SELECT id_nis FROM siswa WHERE id_nis = '${username}' AND password = crypt('${password}', password)`);
    return adaSiswa;
}
const validasiSiswaBaru = async (nis, nisn) => {
    const { rows: [siswa] } = await pool.query(`SELECT id_nis FROM siswa WHERE id_nis = '${nis}' OR nisn = '${nisn}'`);
    return siswa;
}
const validasiNamaKelas = async (nama) => {
    const validasiNamaKelas = await pool.query(`SELECT nama_kelas FROM kelas WHERE nama_kelas = '${nama}'`);
    return validasiNamaKelas;
}
const tambahDataSiswa = async (nis, nisn, nama, kelas, alamat, telpon, email, password) => {
    const { rows: tambah } = await pool.query(`INSERT INTO siswa VALUES ('${nis}', '${nisn}','${nama}', '${kelas}', '${alamat}', '${telpon}', '${email}', crypt('${password}', gen_salt('bf', 10)), now()) RETURNING *`);
    return tambah;
}
const hapusDataSiswa = async (id) => {
    const { rows: hapus } = await pool.query(`DELETE FROM siswa WHERE id_nis = '${id}' RETURNING *`);
    return hapus;
}
// Detail Siswa
const detailSiswa = async (id) => {
    const { rows: [siswa] } = await pool.query(`SELECT * FROM "v_Siswa" WHERE id_nis = '${id}'`);
    return siswa;
}
const ubahNIS = async (nis, nisn) => {
    const { rows: siswa } = await pool.query(`UPDATE siswa SET id_nis = '${nis}' WHERE nisn = '${nisn}' RETURNING *`);
    return siswa;
}
const ubahDataSiswa = async (nis, nisn, nama, kelas, alamat, telpon, email) => {
    const { rows: ubah } = await pool.query(`UPDATE siswa SET nisn = '${nisn}', nama_siswa = '${nama}', id_kelas = '${kelas}', alamat = '${alamat}', telp = '${telpon}', email = '${email}' WHERE id_nis = '${nis}' RETURNING *`);
    return ubah;
}
const validasiSeluruhSiswa = async (nisn, nama, kelas, alamat, telpon, email) => {
    const { rows: siswa } = await pool.query(`SELECT id_nis FROM "v_Siswa" WHERE nisn = '${nisn}' AND nama = '${nama}' AND kelas = '${kelas}' AND alamat = '${alamat}' AND telp = '${telpon}' AND email = '${email}'`);
    return siswa;
}

// SPP Siswa
const SPPsiswa = async () => {
    const { rows: siswa } = await pool.query(`SELECT * FROM "v_Siswa_SPP"`);
    return siswa;
}
const pembayaranSiswa = async (nis) => {
    const { rows: siswa } = await pool.query(`SELECT * FROM "v_Pembayaran" WHERE id_nis = '${nis}' AND status IS NULL`);
    return siswa;
}
const pembayaranSiswaMasuk = async (nis) => {
    const { rows: siswa } = await pool.query(`SELECT * FROM "v_Pembayaran_Masuk" WHERE id_nis = '${nis}' AND status = 'masuk'`);
    return siswa;
}
const pembayaranSiswaKeluar = async (nis) => {
    const { rows: siswa } = await pool.query(`SELECT * FROM "v_Pembayaran_Keluar" WHERE id_nis = '${nis}' AND status = 'keluar'`);
    return siswa;
}
const ubahSPPsiswa = async (id, nominal, nis) => {
    const { rows: SPPsiswa } = await pool.query(`UPDATE akuntansi SET id_spp = '${id}', debet = '${nominal}' WHERE id_nis = '${nis}' RETURNING *`);
    return SPPsiswa;
}
const tahunSPP = async () => {
    const { rows: spp } = await pool.query(`SELECT DISTINCT(tahun) AS tahun FROM spp`);
    return spp;
}
const validasiTahunSPP = async (tahun) => {
    const validasiSPP = await pool.query(`SELECT DISTINCT(tahun) AS tahun FROM spp WHERE tahun = ${tahun}`);
    return validasiSPP;
}
const tambahPembayaran = async (id, gambar_path, gambar_nama, nis) => {
    const { rows: laporan } = await pool.query(`INSERT INTO pembayaran (id_pembayaran, tgl_bayar_masuk, status, gambar_path, gambar_nama, id_nis) VALUES (${id}, now(), 'masuk', '${gambar_path}', '${gambar_nama}', '${nis}') RETURNING *`);
    return laporan;
}
const sepertiIDPembayaran = async (tanggal) => {
    const { rows: sepertiIDPembayaran } = await pool.query(`SELECT id_pembayaran FROM pembayaran WHERE id_pembayaran::text LIKE '${tanggal}%'`);
    return sepertiIDPembayaran;
}

module.exports = {
    // Login
    ambilAkunSiswa,
    ambilAkunPetugas,
    // Dasbor
    // Admin && Petugas
    petugas,
    siswa,
    // Admin
    // Kelas
    kelas,
    validasiNamaJurusan,
    sepertiIDKelas,
    sepertiNamaKelas,
    tambahDataKelas,
    hapusDataKelas,
    // Jurusan
    jurusan,
    validasiIDJurusan,
    validasiJurusan,
    tambahDataJurusan,
    hapusDataJurusan,
    ubahDataJurusan,
    // SPP
    spp,
    validasiIDSPP,
    tambahDataSPP,
    hapusDataSPP,
    // Siswa
    validasiLoginSiswa,
    validasiNamaKelas,
    validasiSiswaBaru,
    tambahDataSiswa,
    hapusDataSiswa,
    // Petugas
    tambahDataPetugas,
    validasiLoginPetugas,
    validasiPetugasBaru,
    hapusDataPetugas,
    // Detail Petugas
    detailPetugas,
    ubahDataPetugas,
    validasiSeluruhPetugas,
    // Detail Siswa
    detailSiswa,
    ubahDataSiswa,
    ubahNIS,
    validasiSeluruhSiswa,
    // Pembayaran
    // Memberikan SPP
    SPPsiswa,
    ubahSPPsiswa,
    tahunSPP,
    validasiTahunSPP,
    // Membayar SPP
    pembayaranSiswa,
    pembayaranSiswaMasuk,
    pembayaranSiswaKeluar,
    sepertiIDPembayaran,
    tambahPembayaran
}