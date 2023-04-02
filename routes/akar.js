// Import third-party module
const express = require('express');
// const multer = require('multer')
// Variables of module
const router = express.Router();
// const upload = multer({dest: './public/img/uploads/'})
// Local module
const akar = require('../controllers/kontrolerAkar')
// const auth = require('../controllers/authController')
// const valid = require('../middleware/productListValidation')

// Router to render and switch directories in URL
// Index/home route
router.route('/')
    // All role can see
    .get(akar.akar)
    // Only superadmin can post from akar
    // .post(upload.single('image'), valid.insertProduct(), akar.akarPost)
    // Only user can put from akar
    // .put(akar.akarPut)

// Logout route
router.route('/keluar')
    .get(akar.keluar)
    // .get(auth.deleteSession)
    
module.exports = router