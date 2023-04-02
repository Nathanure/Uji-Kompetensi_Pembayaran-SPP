// Import third-party module
const express = require('express');
// Variables of module
const router = express.Router();
// Local module
const daftarSPP = require('../controllers/kontrolerSPP')
const spp = require('../middleware/validasiSPP')

// Router to render and switch directories in URL
// Index/home route
router.route('/')
    // All role can see
    .get(daftarSPP.tampilSeluruhnya)
    .post(spp(), daftarSPP.tambahSPP)
    .delete(daftarSPP.hapusSatu)
    
module.exports = router