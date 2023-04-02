// Fungsi untuk progress bar/loading bar
function progressBar(id) {
    const pesan = document.getElementById(id);
    if (pesan) {
        const progressBar = pesan.querySelector(".progress-bar");

        // Membuat progress bar berjalan/loading
        const startTime = new Date().getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const progress = Math.min((now - startTime) / 1000 * 60, 100);
            progressBar.style.width = progress + "%";
            progressBar.setAttribute("aria-valuenow", progress);
            if (progress >= 100) {
                clearInterval(timer);
            }
        }, 50);

        // Menutup alert setelah 2 detik berlalu
        setTimeout(function () {
            pesan.remove();
        }, 3000);
    }
}

// Fungsi untuk pesan berhasil
function pesanBerhasil (response) {
    const responses = response.data[0];
    if (responses.lokasi === 'pembayaran' && responses.hal !== undefined) {
        const id = responses.id;
        const spp = responses.spp;
        const nominal = responses.nominal;
        const keterangan = responses.keterangan;
        const lokasi = responses.lokasi;
        const hal = responses.hal;
        window.location=`/${lokasi}?id=${id}&nama=${spp}&nominal=${nominal}&keterangan=${keterangan}&lokasi=${lokasi}&hal=${hal}`;
    } else {
        const id = responses.id;
        const nama = responses.nama;
        const keterangan = responses.keterangan;
        const lokasi = responses.lokasi;
        if (lokasi === 'petugas' || lokasi === 'siswa') return window.location=`/akun?id=${id}&nama=${nama}&keterangan=${keterangan}&lokasi=${lokasi}`;
        window.location=`/${lokasi}?id=${id}&nama=${nama}&keterangan=${keterangan}&lokasi=${lokasi}`;
    }
}
// Fungsi untuk pesan gagal
function pesanGagal (error, lokasi, keterangan) {
    // Membuat pesan gagal bila ada error
    const pesan = document.getElementById('utama');
    
    if (pesan) {
        const gagal = document.createElement('div');
        gagal.innerHTML = [
            '<div id="pesan-gagal" class="flex-top alert alert-danger alert-dismissible" role="alert">',
                '<div class="d-flex justify-content-between align-items-center">',
                    '<div class="d-flex align-items-center gap-3 p-3">',
                        '<i class="bi bi-x-circle display-4 d-inline-flex"></i>',
                        '<div class="d-grid">',
                            `<div>${error}</div>`,
                            `<div>${keterangan} Data <span class="text-capitalized">${lokasi}</span> gagal!</div>`,
                            `<div class="small">Mengarahkan kembali ke Halaman <span class="text-capitalized">${lokasi}</span></div>`,
                        '</div>',
                    '</div>',
                    '<button type="button" class="position-relative btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
                '<div class="progress" role="progressbar" aria-label="Loading bar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">',
                    '<div class="progress-bar progress-bar-striped progress-bar-animated"></div>',
                '</div>',
            '</div>'
        ].join('');
    
        pesan.append(gagal);
        progressBar('pesan-gagal');
    
        setTimeout(() => {
            gagal.remove();
            flag = false;
            window.location = `/`;
        }, 3000);
    }
}
// API untuk tombol delete
function deleteReq(pathname) {
    // Mengambil data saat tombol ubah dan hapus dipencet dari tiap baris
    const delete_btn = document.querySelector('#delete-btn');
    if (delete_btn) {
        // Menambah event listener untuk mengambil data setiap tombol ditekan
        delete_btn.addEventListener("click", () => {
            // Axios
            // Mengambil data query
            const query = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            const tingkatan = query.hapus.split('-')[1];
            if (tingkatan === 'petugas' || tingkatan === 'siswa') {
                // Mengirim request delete untuk menghapus di URL yang dituju
                axios.delete(`/${pathname}/${tingkatan}?hapus=${query.hapus}&id=${query.id}`)
                // Fungsi untuk menampilkan respon berhasil
                    .then(response => pesanBerhasil(response))
                    .catch(error => pesanGagal(error, pathname, 'Hapus'));
            } else {
                // Mengirim request delete untuk menghapus di URL yang dituju
                axios.delete(`/${pathname}/?hapus=${query.hapus}&id=${query.id}`)
                // Fungsi untuk menampilkan respon berhasil
                    .then(response => pesanBerhasil(response))
                    .catch(error => pesanGagal(error, pathname, 'Hapus'));
            }
        });
    }
}
// API untuk tombol edit
function editJurusan () {
    const edit_btn = document.querySelector('#edit-btn');
    if (edit_btn) {
        // Menambah event listener untuk mengambil data setiap tombol ditekan
        edit_btn.addEventListener("click", () => {
            // Axios
            const id_jurusan = document.getElementById('id_jurusan').value;
            const nama_jurusan = document.getElementById('nama_jurusan').value;
            const data_jurusan = {id_jurusan, nama_jurusan};
            axios.put('/jurusan/', data_jurusan, {headers: {'Content-Type': 'application/json'}})
                .then(response => pesanBerhasil(response))
                .catch(error => pesanGagal(error, 'jurusan', 'Ubah'));
        });
    }
}
function editNIS () {
    const edit_btn = document.querySelector('#edit-btn');
    if (edit_btn) {
        // Menambah event listener untuk mengambil data setiap tombol ditekan
        edit_btn.addEventListener("click", () => {
            // Axios
            const nis = document.getElementById('nis').value;
            const nisn = document.getElementById('nisn').value;
            const nama = document.getElementById('nama_siswa').value;
            const data_nis = {nis, nisn, nama};
            axios.put('/akun/siswa', data_nis, {headers: {'Content-Type': 'application/json'}})
                .then(response => pesanBerhasil(response))
                .catch(error => pesanGagal(error, 'siswa', 'Ubah'));
        });
    }
}
function editSPP () {
    const edit_btn = document.querySelector('#edit-btn');
    if (edit_btn) {
        // Menambah event listener untuk mengambil data setiap tombol ditekan
        edit_btn.addEventListener("click", () => {
            // Axios
            const nis = document.getElementById('nis').value;
            const kelas = document.getElementById('tingkat_kelas').value;
            const tahun = document.getElementById('tahun').value;
            const spp = {nis, kelas, tahun};
            axios.put('/pembayaran', spp, {headers: {'Content-Type': 'application/json'}})
                .then(response => pesanBerhasil(response))
                .catch(error => pesanGagal(error, 'siswa', 'Ubah'));
        });
    }
}
window.addEventListener("load", function () {
    const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
    deleteReq(pathname);
    if (pathname === 'jurusan') editJurusan();
    if (pathname === 'pembayaran') editSPP();
    if (pathname.split('/')[0] === 'akun') editNIS();
    progressBar('pesan-berhasil');
});