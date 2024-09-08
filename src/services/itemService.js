const connection = require('../config/database');

const getAllItems = async () => {
    const [ rows, fields ] = await connection.query('SELECT * FROM ITEMS');
    return { rows, fields };
}

const createItem = async (item_name) => {
    await connection.query(`INSERT INTO ITEMS (ITEM_NAME) VALUES (?);`, [ item_name ]);
}

const updateItem = async (itemId, itemName) => {
    await connection.query(`UPDATE ITEMS SET ITEM_NAME = ? WHERE ITEM_ID = ?;`, [ itemName, itemId ]);
}

const getItemById = async (item_id) => {
    const [ rows, fields ] = await connection.query(`SELECT * FROM ITEMS WHERE ITEM_NAME = ?;`, [ item_id ]);
    return rows;
}

const deleteItembyId = async (item_id) => {
    const [ rows, fields ] = await connection.query(`DELETE FROM ITEMS WHERE ITEM_ID = ?;`, [ item_id ]);
    return rows;
}
module.exports = {
    getAllItems,
    createItem,
    updateItem,
    getItemById,
    deleteItembyId
}