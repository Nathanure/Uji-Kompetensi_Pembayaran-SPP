// Mengambil modul pihak ketiga
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const session = require('express-session') ;
const path = require('path');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
// Mengambil modul lokal
// const morganConfig = require('./config/logger');
const corsOptions = require('./config/cors');
const sessionMain = require('./config/session');
const checkDir = require('./config/createFs');

// Variabel untuk express
const app = express();
// Variable untuk port
const port = 3000;

// Static public directory
app.use(express.static(path.join(__dirname, 'public')));

// Persiapan awal untuk menggunakan EJS agar bisa merender javascript dari backend (Express)
app.set('view engine', 'ejs');

// Persiapaan awal untuk menggunakan express-ejs-layouts dengan Express
app.use(expressLayouts);

// Mengecek folder dan membuatnya bilamana sebelumnya belum ada
checkDir();

// app.use(logger(morganConfig)) // Middleware HTTP untuk mengetahui kegiatan dalam web
app.use(cors(corsOptions)); // CORS (Cross Origin Resource Sharing) whitelist, agar bisa mengirim dan menerima data dari API
app.use(session(sessionMain)); // Sesi web
app.use(express.json()); // Middleware agar Express bisa menggunakan JSON
app.use(cookieParser()); // Cookie Parser untuk sesi
app.use(express.urlencoded({ extended: true })); // Middleware untuk berfungsi dalam penggunaan url-encoded form data

// Middleware untuk merender rute dan mengganti arahnya di URL
// Rute global
app.use('/', require('./routes/akar'));
app.use('/login', require('./routes/autentikasi'));
// app.use('/reset-password', require('./routes/resetPassword'))
// Rute admin
app.use('/kelas/', require('./routes/kelas'));
app.use('/jurusan', require('./routes/jurusan'));
app.use('/spp', require('./routes/spp'));
// Rute admin dan petugas
app.use('/akun', require('./routes/akun'));
app.use('/pembayaran', require('./routes/pembayaran'));
// Rute petugas
// Rute masyarakat
// app.use('/item', require('./routes/item'))
// app.use('/cart', require('./routes/cart'))
// app.use('/checkout', require('./routes/checkout'))

// 404 Not Found if page is not found
// Mengembalikan kode 404 bila suatu url tidak ditemukan dalam web
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.render('root/404', {
            title: '404 Not Found',
            layout: 'layout/hanya-konten'
        });
    } else if (req.accepts('json')) {
        res.json({error: "404 Not Found"});
    } else {
        res.type('txt').send('404 Not Found');
    }
})
// Mengembalikan kode 401 bila suatu url tidak memperbolehkan akses pengguna dalam web
app.all('*', (req, res) => {
    res.status(401);
    if (req.accepts('html')) {
        res.render('root/401', {
            title: '401 Unauthorized',
            layout: 'layout/hanya-konten'
        });
    } else if (req.accepts('json')) {
        res.json({error: "401 Unauthorized"});
    } else {
        res.type('txt').send('401 Unauthorized');
    }
})
// Mengembalikan kode 500 bila suatu terjadi kesalahan yang terjadi dalam web
app.all('*', (req, res) => {
    res.status(500);
    if (req.accepts('html')) {
        res.render('root/500', {
            title: '500 Internal Server Error',
            layout: 'layout/hanya-konten'
        });
    } else if (req.accepts('json')) {
        res.json({error: "500 Internal Server Error"});
    } else {
        res.type('txt').send('500 Internal Server Error');
    }
})

// Jalannya server dalam port
app.listen(port, () => {
    console.log(`Server currently running on port ${port}`);
})