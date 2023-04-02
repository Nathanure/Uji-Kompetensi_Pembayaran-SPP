// Function for mask and unmask on sensitive string
function mataPassword(id) {
    $("#" + id + " button").on('click', function (event) {
        event.preventDefault();
        if ($('#' + id + ' input').attr("type") == "text") {
            $('#' + id + ' input').attr('type', 'password');
            $('#' + id + ' i').addClass("bi-eye-slash-fill");
            $('#' + id + ' i').removeClass("bi-eye-fill");
        } else if ($('#' + id + ' input').attr("type") == "password") {
            $('#' + id + ' input').attr('type', 'text');
            $('#' + id + ' i').removeClass("bi-eye-slash-fill");
            $('#' + id + ' i').addClass("bi-eye-fill");
        }
    });
}

// Function for collapse on login
$(document).ready(function () {
    $('#btnSiswa, #btnPetugas').on('click', function () {
        var target = $($(this).data('bs-target'));
        var other = $($(this).siblings('button').data('bs-target'));
        if (target.hasClass('show')) {
            return;
        } else {
            other.removeClass('show');
            target.addClass('show');
            $(this).addClass('active');
            $(this).siblings('button').removeClass('active');
        }
    });
})

// Bootstrap Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Memanggil pembungkus
async function getDivsNoPrint(id_bungkus) {
    id_bungkus.classList.add('d-grid', 'gap-2');
    // Menambahkan div sebagai baris pada pembungkus
    const barisSatu = document.createElement('div');
    const barisDua = document.createElement('div');
    const barisTiga = document.createElement('div');
    barisSatu.classList.add('row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    barisDua.classList.add('row', 'dt-row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    barisTiga.classList.add('row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    // Menambahkan div sebagai kolom pada baris
    const ukuran = document.createElement('div');
    const filter = document.createElement('div');
    const tabel = document.createElement('div');
    const info = document.createElement('div');
    const halaman = document.createElement('div');
    ukuran.classList.add('col-12', 'col-sm-auto', 'px-0');
    filter.classList.add('col-12', 'col-sm-auto', 'px-0');
    tabel.classList.add('col-12', 'px-0');
    info.classList.add('col-12', 'col-sm-auto', 'px-0');
    halaman.classList.add('col-12', 'col-sm-auto', 'px-0');
    // Menggabungkan div yang telah dibuat ke seluruh ekstensi tabelnya
    halaman.appendChild(id_bungkus.childNodes[4]);
    info.appendChild(id_bungkus.childNodes[3]);
    tabel.appendChild(id_bungkus.childNodes[2]);
    filter.appendChild(id_bungkus.childNodes[1]);
    ukuran.appendChild(id_bungkus.childNodes[0]);
    // Menggabungkan div agar bisa berada di dalam div
    barisSatu.appendChild(ukuran);
    barisSatu.appendChild(filter);
    barisDua.appendChild(tabel);
    barisTiga.appendChild(info);
    barisTiga.appendChild(halaman);
    // Menggabungkan div agar bisa berada di tiap baris
    id_bungkus.appendChild(barisSatu);
    id_bungkus.appendChild(barisDua);
    id_bungkus.appendChild(barisTiga);
}
async function getDivsPrint(id_bungkus) {
    id_bungkus.classList.add('d-grid', 'gap-2', 'overflow-auto');
    // Menambahkan div sebagai baris pada pembungkus
    const barisSatu = document.createElement('div');
    const barisDua = document.createElement('div');
    const barisTiga = document.createElement('div');
    const barisEmpat = document.createElement('div');
    barisSatu.classList.add('row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    barisDua.classList.add('row', 'dt-row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    barisTiga.classList.add('row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    barisEmpat.classList.add('row', 'gap-2', 'mx-0', 'justify-content-sm-between');
    // Menambahkan div sebagai kolom pada baris
    const ukuran = document.createElement('div');
    const filter = document.createElement('div');
    const tabel = document.createElement('div');
    const info = document.createElement('div');
    const halaman = document.createElement('div');
    const print = document.createElement('div');
    ukuran.classList.add('col-12', 'col-sm-auto', 'px-0');
    filter.classList.add('col-12', 'col-sm-auto', 'px-0');
    tabel.classList.add('col-12', 'px-0');
    info.classList.add('col-12', 'col-sm-auto', 'px-0');
    halaman.classList.add('col-12', 'col-sm-auto', 'px-0');
    print.classList.add('col-12', 'col-sm-auto', 'px-0');
    id_bungkus.childNodes[5].classList.add('m-0')
    // Menggabungkan div yang telah dibuat ke seluruh ekstensi tabelnya
    print.appendChild(id_bungkus.childNodes[5]);
    halaman.appendChild(id_bungkus.childNodes[4]);
    info.appendChild(id_bungkus.childNodes[3]);
    tabel.appendChild(id_bungkus.childNodes[2]);
    filter.appendChild(id_bungkus.childNodes[1]);
    ukuran.appendChild(id_bungkus.childNodes[0]);
    // Menggabungkan div agar bisa berada di dalam div
    barisSatu.appendChild(ukuran);
    barisSatu.appendChild(filter);
    barisDua.appendChild(tabel);
    barisTiga.appendChild(info);
    barisTiga.appendChild(halaman);
    barisEmpat.appendChild(print);
    // Menggabungkan div agar bisa berada di tiap baris
    id_bungkus.appendChild(barisSatu);
    id_bungkus.appendChild(barisDua);
    id_bungkus.appendChild(barisTiga);
    id_bungkus.appendChild(barisEmpat);
}

// Datatables untuk dasbor
window.addEventListener('DOMContentLoaded', async event => {
    // Variabel untuk memanggil komponen
    // Print
    const id_print_1 = 'tabel-print-1';
    const tabel_print_1 = document.getElementById(id_print_1);
    const id_print_2 = 'tabel-print-2';
    const tabel_print_2 = document.getElementById(id_print_2);
    // Tanpa cetak
    const id_noprint_1 = 'tabel-noprint-1';
    const tabel_noprint_1 = document.getElementById(id_noprint_1);
    const id_noprint_2 = 'tabel-noprint-2';
    const tabel_noprint_2 = document.getElementById(id_noprint_2);
    // Mengubah struktur dari datatable, saat menggunakan atribut objek "dom"
    // Dengan cetak
    if (tabel_print_1) {
        // Inisialisasi simple-datatables
        new DataTable(tabel_print_1, {
            dom: 'lfrtipBeS',
            fixedHeader: true
        });
        // Memanggil pembungkus
        const bungkus = document.getElementById(id_print_1 + '_wrapper');
        await getDivsPrint(bungkus);
    }
    if (tabel_print_2) {
        // Inisialisasi simple-datatables
        new DataTable(tabel_print_2, {
            dom: 'lfrtipBeS',
            fixedHeader: true
        });
        // Memanggil pembungkus
        const bungkus = document.getElementById(id_print_2 + '_wrapper');
        await getDivsPrint(bungkus);
    }
    // Tanpa cetak
    if (tabel_noprint_1) {
        // Inisialisasi simple-datatables
        new DataTable(tabel_noprint_1);
        // Memanggil pembungkus
        const bungkus = document.getElementById(id_noprint_1 + '_wrapper');
        await getDivsNoPrint(bungkus);
    }
    if (tabel_noprint_2) {
        // Inisialisasi simple-datatables
        new DataTable(tabel_noprint_2);
        // Memanggil pembungkus
        const bungkus = document.getElementById(id_noprint_2 + '_wrapper');
        await getDivsNoPrint(bungkus);
    }
});

// Toggle the side navigation
window.addEventListener('DOMContentLoaded', event => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // To persist sidebar toggle between refreshes
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});

function labelMelambung(kelas, elementInput) {
    // Variable for all .input-container
    const floatContainer = document.querySelectorAll(`.${kelas}`);

    // Iteration for every containered input with the class 'input-container'
    floatContainer.forEach(element => {
        // Display for value if input already has it
        if (element.querySelector(elementInput).value) {
            element.classList.add('active');
        }
        const handleFocus = (e) => {
            const target = e.target;
            // Add .active in the container and placeholder attribute in input tag
            target.parentNode.classList.add('active');
            target.setAttribute('placeholder', target.getAttribute('input-placeholder'));
        }
        const handleBlur = (e) => {
            const target = e.target;
            // Remove .active if it doesn't have any value inside it and placeholder attribute in input tag
            if (!target.value) target.parentNode.classList.remove('active');
            target.removeAttribute('placeholder')
        }
        // Variable for input that's in the container
        const floatInput = element.querySelector(elementInput);
        // EventListener for every time input is focus and blur
        floatInput.addEventListener('focus', handleFocus)
        floatInput.addEventListener('blur', handleBlur)
    });
}

// Front side validation
// Function untuk RegExp hanya memperbolehkan huruf saja
function hanyaHuruf(id_huruf) {
    const huruf = document.getElementById(id_huruf);
    if (huruf) {
        huruf.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Z]/g, '');
        });
    }
}
// Function untuk RegExp hanya memperbolehkan huruf dan spasi
function hanyaHurufSpasi(id_huruf) {
    const huruf = document.getElementById(id_huruf);
    if (huruf) {
        huruf.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }
}
// Function untuk RegExp hanya memperbolehkan karakter, namun tanpa spasi
function tanpaSpasi(id_huruf) {
    const huruf = document.getElementById(id_huruf);
    if (huruf) {
        huruf.addEventListener("input", function () {
            this.value = this.value.replace(/\s+/g, '');
        });
    }
}
// Function untuk RegExp hanya memperbolehkan alamat format
function hanyaAlamat(id_huruf) {
    const huruf = document.getElementById(id_huruf);
    if (huruf) {
        huruf.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Z0-9\s#\.\,\-\/]+/g, '');
        });
    }
}
// Function untuk RegExp hanya memperbolehkan email format
function hanyaEmail(id_huruf) {
    const huruf = document.getElementById(id_huruf);
    if (huruf) {
        huruf.addEventListener("input", function () {
            let email = this.value;
            // Email address benar
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return true;
                // Email address salah
            } else {
                email = email.replace(/[^\s@]+@[^\s@]+\.[^\s@]*/g, "");
                return false;
            }
        });
    }
}
// Function untuk RegExp hanya memperbolehkan angka
function hanyaIDJurusan(id_angka, batas) {
    const angka = document.getElementById(id_angka);
    if (angka) {
        // Hanya angka
        angka.addEventListener("input", function () {
            // RegExp untuk angka diantara 0-9
            this.value = this.value.replace(/[^0-9]/g, '');
            // Membatasi angka kurang dari 6 karakter
            if (this.value.length > 5) this.value = this.value.slice(0, 5);
            if (batas === 5 && parseInt(this.value) > 32768) this.value = "32768";
        });
    }
}
// Function untuk RegExp hanya memperbolehkan angka
function hanyaAngka(id_angka, batas) {
    const angka = document.getElementById(id_angka);
    if (angka) {
        // Number only with text input
        angka.addEventListener("input", function () {
            // RegExp for number between 0-9 only
            this.value = this.value.replace(/[^0-9]/g, '');
            // Limit input to ... characters
            if (this.value.length > batas) this.value = this.value.slice(0, batas);
        });
    }
}
// Function pesan, nilai select kosong
// function pesanGagal(event, select, id_select, container, field) {
//     if (select.value === "") {
//         const pesan = document.getElementById(container);
//         if (pesan) {
//             const gagal = document.createElement('div');
//             gagal.setAttribute('id', `validasi${id_select}`);
//             gagal.classList.add('invalid-feedback', 'd-block');
//             gagal.innerHTML = `Harap memilih pilihan untuk <span class="fw-bold">${field}</span>.`;

//             pesan.append(gagal);
//             event.preventDefault();
//         }
//     }
// }
// Function untuk hanya memperbolehkan yang memiliki nilai value
function validSelect(id_select, container, field) {
    const select = document.getElementById(id_select);
    const submit = document.getElementById('submit-btn');
    const edit = document.getElementById('edit-btn');
    const pesan = document.getElementById(container);
    if (submit) {
        submit.addEventListener("click", function (event) {
            // Membuat pesan gagal bila nilai kosong
            const gagal = document.querySelector(`#validasi${id_select}`);
            if (select.value === "") {
                // Membuat pesan baru bila belum ada pesannya
                if (!gagal) {
                    const gagalBaru = document.createElement('div');
                    gagalBaru.setAttribute('id', `validasi${id_select}`);
                    gagalBaru.classList.add('invalid-feedback', 'd-block');
                    gagalBaru.innerHTML = `Harap memilih pilihan untuk <span class="fw-bold">${field}</span>.`;

                    pesan.append(gagalBaru);
                    event.preventDefault();
                    // Bila ada pesan namun nilainya belum berubah maka isinya akan tetap sama
                } else {
                    gagal.innerHTML = `Harap memilih pilihan untuk <span class="fw-bold">${field}</span>.`;
                    event.preventDefault();
                }
                // Menghapus pesan bila sudah ada nilainya
            } else if (gagal) pesan.removeChild(gagal);
        });
    }
    if (edit) {
        edit.addEventListener("click", function (event) {
            // Membuat pesan gagal bila nilai kosong
            const gagal = document.querySelector(`#validasi${id_select}`);
            if (select.value === "") {
                // Membuat pesan baru bila belum ada pesannya
                if (!gagal) {
                    const gagalBaru = document.createElement('div');
                    gagalBaru.setAttribute('id', `validasi${id_select}`);
                    gagalBaru.classList.add('invalid-feedback', 'd-block');
                    gagalBaru.innerHTML = `Harap memilih pilihan untuk <span class="fw-bold">${field}</span>.`;

                    pesan.append(gagalBaru);
                    event.preventDefault();
                    // Bila ada pesan namun nilainya belum berubah maka isinya akan tetap sama
                } else {
                    gagal.innerHTML = `Harap memilih pilihan untuk <span class="fw-bold">${field}</span>.`;
                    event.preventDefault();
                }
                // Menghapus pesan bila sudah ada nilainya
            } else if (gagal) pesan.removeChild(gagal);
        });
    }
}
// Function untuk select
function selectData(id_select) {
    const select = document.getElementById(id_select);
    // select menggunakan library dselect
    if (select) dselect(select)
}
// Function untuk hanya menampilkan input dan mencari data yang ada dalam select
function searchData(id_select) {
    const select = document.getElementById(id_select);
    // search menggunakan library dselect
    if (select) dselect(select, { search: true })
}

// Deklarasi hanya 'sesuatu' dengan memasukan nama id suatu input field
window.addEventListener("load", () => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
        labelMelambung('input-container', 'input');
        // Login Siswa
        hanyaAngka('usernameSiswa');
        tanpaSpasi('passwordSiswa');
        mataPassword('mata-passwordSiswa');
        // Login Petugas
        tanpaSpasi('usernamePetugas');
        tanpaSpasi('passwordPetugas');
        mataPassword('mata-passwordPetugas');
    } else if (pathname.split('/')[1] === 'jurusan') {
        // Form Jurusan
        hanyaHurufSpasi('nama_jurusan');
        hanyaIDJurusan('id_jurusan');
        labelMelambung('input-container', 'input');
    }
    else if (pathname.split('/')[1] === 'kelas') {
        // Form Kelas
        validSelect('tingkat_kelas', 'tingkat-container', 'Tingkat Kelas');
        selectData('tingkat_kelas');
        validSelect('nama_jurusan', 'jurusan-container', 'Nama Jurusan');
        searchData('nama_jurusan');
    }
    else if (pathname.split('/')[1] === 'spp') {
        // Form SPP
        validSelect('tingkat_kelas', 'tingkat-container', 'Tingkat Kelas');
        validSelect('tahun', 'tahun-container', 'Tahun');
        hanyaAngka('nominal', 7);
        labelMelambung('input-container', 'input');
    }
    else if (pathname.split('/')[1] === 'akun') {
        // Akun
        labelMelambung('input-container', 'input');
        labelMelambung('textarea-container', 'textarea');
        // Form Petugas
        hanyaHurufSpasi('nama_petugas');
        tanpaSpasi('username_petugas');
        hanyaEmail('email_petugas');
        hanyaAngka('telpon_petugas', 13);
        tanpaSpasi('password_petugas');
        tanpaSpasi('konfirmasi_password_petugas');
        mataPassword('mata-passwordPetugas');
        mataPassword('mata-konfirmasiPasswordPetugas');
        // Form Siswa
        hanyaAngka('nis', 10);
        hanyaAngka('nisn', 10);
        hanyaHurufSpasi('nama_siswa');
        searchData('kelas_siswa');
        hanyaAlamat('alamat_siswa');
        hanyaAngka('telpon_siswa', 13);
        hanyaEmail('email_siswa');
        tanpaSpasi('password_siswa');
        tanpaSpasi('konfirmasi_password_siswa');
        mataPassword('mata-passwordSiswa');
        mataPassword('mata-konfirmasiPasswordSiswa');
    }
    else if (pathname.split('/')[1] === 'pembayaran') {
        // SPP
        validSelect('tingkat_kelas', 'tingkat-container', 'Tingkat Kelas');
        validSelect('tahun', 'tahun-container', 'Tahun');
    }
})
