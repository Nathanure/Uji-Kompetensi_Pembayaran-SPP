// Function render EJS with status that are within these codes
const status401 = async (req, res) => {
    // Dengan session admin
    res.status(401).render('root/401', {
        title: '401 Tidak Diizinkan',
        layout: 'layout/hanya-konten',
    });
}
const status404 = async (req, res) => {
    // Dengan session admin
    res.status(404).render('root/404', {
        title: '404 Tidak Ditemukan',
        layout: 'layout/hanya-konten',
    });
}
const status500 = async (req, res) => {
    // Dengan session admin
    res.status(500).render('root/500', {
        title: '500 Masalah Internal Server',
        layout: 'layout/hanya-konten',
    });
}

module.exports = {
    status401,
    status404,
    status500
}