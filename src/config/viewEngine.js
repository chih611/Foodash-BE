const path = require('path');
const cors = require('cors');
const express = require('express');
const configViewEngine = (app) => {
    //config template
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');
    app.use(cors());
    // config static file
    app.use(express.static(path.join(__dirname, 'public')));
}
module.exports = configViewEngine;