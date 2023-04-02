// Import built-in middleware
const fs = require('fs');

// Initialized in server.js
// Check and make directories if it hasn't been made yet
const checkDir = () => {
    if (!fs.existsSync('./controllers/')) fs.mkdirSync('./controllers/');
    if (!fs.existsSync('./middleware/')) fs.mkdirSync('./middleware/');
    if (!fs.existsSync('./public/')) fs.mkdirSync('./public/');
    if (!fs.existsSync('./public/img')) fs.mkdirSync('./public/img/');
    if (!fs.existsSync('./public/css')) fs.mkdirSync('./public/css/');
    if (!fs.existsSync('./public/js')) fs.mkdirSync('./public/js/');
    if (!fs.existsSync('./routes/')) fs.mkdirSync('./routes/');
    if (!fs.existsSync('./views/')) fs.mkdirSync('./views/');
    if (!fs.existsSync('./views/layout')) fs.mkdirSync('./views/layout/');
    if (!fs.existsSync('./views/layout/components')) fs.mkdirSync('./views/layout/components/');
    // if (!fs.existsSync('./public/img/products/')) fs.mkdirSync('./public/img/products/');
    // if (!fs.existsSync('./model/')) fs.mkdirSync('./model/');
    // if (!fs.existsSync('./model/checkout.json')) fs.writeFileSync('./model/checkout.json', '[]', 'utf-8');
} 

module.exports = checkDir;