const connection = require('../config/database');

const getItems = (req, res) => {
    connection.query('SELECT * FROM ITEMS', function (err, rows) {
        res.status(200).json(rows);
    });
}

module.exports = {
    getItems
}