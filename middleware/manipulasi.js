// Import third-party module
const db = require('./manajemenDB');

// Mengubah nama_jurusan menjadi id_jurusan
const ubahIDJurusan = async (nama_jurusan) => {
    const dataJurusan = await db.jurusan();
    const jurusan = dataJurusan.find(data => (data.nama_jurusan === nama_jurusan));
    return jurusan.id_jurusan;
}
// Mengubah nama_kelas menjadi id_kelas
const ubahIDKelas = async (nama_kelas) => {
    const dataKelas = await db.kelas();
    const kelas = dataKelas.find(data => (data.nama_kelas === nama_kelas));
    return kelas.id_kelas;
}
// Mengubah kelas dan tahun menjadi id_spp
const ubahIDSPP = async (tingkatan, tahun) => {
    const dataSPP = await db.spp();
    const spp = dataSPP.find(data => data.id_spp === (tingkatan + tahun));
    return spp.nominal;
}
// Membuat id_kelas
const idKelas = async (tingkat_kelas, id_jurusan) => {
    // Menggabungkan tingkat_kelas dan id_jurusan
    const tingkat_jurusan = tingkat_kelas + id_jurusan;
    // Memanggil data yang memiliki ID kelas awal sebelum dua angka terakhir dengan LIKE
    const sepertiIDKelas = await db.sepertiIDKelas(tingkat_jurusan);

    // Nilai awal kelas selanjutnya
    let kelasSelanjutnya = 1;
    if (sepertiIDKelas.length > 0) {
        // Mengambil angka kelas dari yang telah diambil dari sepertiIDKelas
        const angkaKelas = sepertiIDKelas.map(data => parseInt(data.id_kelas.substring(data.id_kelas.length - 2)));
        // Mengurutkan angka dalam array secara ascending
        angkaKelas.sort((a, b) => a - b);

        for (let i = 0; i < angkaKelas.length; i++) {
            if (angkaKelas[i] !== kelasSelanjutnya) break;
            kelasSelanjutnya++;
        }
    }

    // Nilai yang akan dikembalikan
    const idKelasSelanjutnya = `${tingkat_jurusan}${kelasSelanjutnya.toString().padStart(2, '0')}`;
    const idAwal = `${tingkat_jurusan}01`;

    // Ternary untuk mengecek bila awal atau bukan
    return sepertiIDKelas.length > 0 ? idKelasSelanjutnya : idAwal;
}
// Membuat id_pembayaran
const idPembayaran = async (tanggal) => {
    // Memanggil data yang memiliki ID pembayaran awal sebelum dua angka terakhir dengan LIKE
    const sepertiIDPembayaran = await db.sepertiIDPembayaran(tanggal);
    console.log(sepertiIDPembayaran);
    // Nilai awal pembayaran selanjutnya
    let pembayaranSelanjutnya = 1;
    if (sepertiIDPembayaran.length > 0) {
        // Mengambil angka pembayaran dari yang telah diambil dari sepertiIDPembayaran
        const angkaPembayaran = sepertiIDPembayaran.map(data => parseInt(data.id_pembayaran.toString().substring(data.id_pembayaran.length - 4)));
        // Mengurutkan angka dalam array secara ascending
        angkaPembayaran.sort((a, b) => a - b);

        for (let i = 0; i < angkaPembayaran.length; i++) {
            if (angkaPembayaran[i] !== pembayaranSelanjutnya) break;
            pembayaranSelanjutnya++;
        }
    }
    console.log(pembayaranSelanjutnya);
    // Nilai yang akan dikembalikan
    const idPembayaranSelanjutnya = parseInt(`${tanggal}${pembayaranSelanjutnya.toString().padStart(4, '0')}`);
    const idAwal = parseInt(`${tanggal}0001`);

    // Ternary untuk mengecek bila awal atau bukan
    return sepertiIDPembayaran.length > 0 ? idPembayaranSelanjutnya : idAwal;
}
// Membuat nama_kelas
const namaKelas = async (tingkat_kelas, nama_jurusan) => {
    const nama_kelas = tingkat_kelas + ' ' + nama_jurusan;
    // Memanggil data yang memiliki nama kelas awal sebelum dua angka terakhir dengan LIKE
    const sepertiNamaKelas = await db.sepertiNamaKelas(nama_kelas);

    // Nilai awal kelas selanjutnya
    let kelasSelanjutnya = 1;
    if (sepertiNamaKelas.length > 0) {
        // Mengambil angka kelas dari yang telah diambil dari sepertiNamaKelas
        const angkaKelas = sepertiNamaKelas.map(data => parseInt(data.nama_kelas.substring(data.nama_kelas.length - 2)));
        // Mengurutkan angka dalam array secara ascending
        angkaKelas.sort((a, b) => a - b);

        for (let i = 0; i < angkaKelas.length; i++) {
            if (angkaKelas[i] !== kelasSelanjutnya) break;
            kelasSelanjutnya++;
        }
    }

    // Nilai yang akan dikembalikan
    const namaKelasSelanjutnya = `${nama_kelas} ${kelasSelanjutnya.toString()}`;
    const namaAwal = `${nama_kelas} 1`;

    // Ternary untuk mengecek bila awal atau bukan
    return sepertiNamaKelas.length > 0 ? namaKelasSelanjutnya : namaAwal;
}

module.exports = {
    // Mengubah
    ubahIDJurusan,
    ubahIDKelas,
    ubahIDSPP,
    // Membuat
    idKelas,
    namaKelas,
    idPembayaran
}