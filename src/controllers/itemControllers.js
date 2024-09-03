const connection = require('../config/database');
console.log(connection);
const getItems = (req, res) => {
    connection.query('SELECT * FROM ITEMS', function (err, rows) {
        res.status(200).json(rows);
    });
    // return res.render('index');
}

module.exports = {
    getItems
}