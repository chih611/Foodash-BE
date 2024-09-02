const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/get', (req, res) => {
    connection.query('SELECT * FROM ITEMS', function (err, rows) {
        res.status(200).json(rows);
    });
});

module.exports = router;