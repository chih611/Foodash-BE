require('dotenv').config();
const cors = require('cors');
const express = require('express')
const app = express()
const path = require('path');
const connection = require('./config/database');
const port = process.env.DB_PORT;
const hostname = process.env.DB_HOST;

//config template
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors());
// config static file
app.use(express.static(path.join(__dirname, 'public')))

app.get('/items', (req, res) => {
    
    connection.query('SELECT * FROM ITEMS', function (err, rows, fields) {
    // res.send(JSON.stringify(rows));
    res.status(200).json( rows );
});
});

 app.listen(8080, hostname, () => {
    console.log(`Example app listening on port ${8080}`)
})
