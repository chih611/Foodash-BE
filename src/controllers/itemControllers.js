const connection = require('../config/database');


const getHome = (req, res) => {
    return res.render('home');
}

const getItems = async (req, res) => {
    const [ rows ] = await connection.query('SELECT * FROM ITEMS');
    res.status(200).send(rows);
}

const createItem = (req, res) => {
    res.send(req.body);
}

module.exports = {
    getHome,
    getItems,
    createItem
}