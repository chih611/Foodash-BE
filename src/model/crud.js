const connection = require('../config/database');

const getAllItems = async () => {
    const [ rows, fields ] = await connection.query('SELECT * FROM ITEMS');
    return { rows, fields };
}

const createItem = async (item_id, item_name) => {

    await connection.query(`INSERT INTO ITEMS (itemId, itemName)
VALUES (?,?);`, [ item_id, item_name ], (error, res) => { console.log(res); });
}
module.exports = {
    getAllItems,
    createItem
}