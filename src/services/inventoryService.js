const connection = require('../config/database');

const getAllInventories = async () => {
    const [ rows, fields ] = await connection.query('SELECT * FROM INVENTORY');
    return { rows, fields };
}

const createInventory = async (inventory_name, category, exp_date, stock_status, notes, task_assigment) => {
    await connection.query(`INSERT INTO foodash.INVENTORY
(INVENTORY_NAME, CATEGORY, EXP_DATE, STOCK_STATUS, NOTES, TASK_ASSIGMENT)
VALUES( ?, ?, ?, ?, ?, ?);`, [ inventory_name, category, exp_date, stock_status, notes, task_assigment ]);
}

const updateInventory = async (inventory_name, category, exp_date, stock_status, notes, task_assigment, id) => {
    await connection.query(`UPDATE foodash.INVENTORY
SET INVENTORY_NAME=?, CATEGORY=?, EXP_DATE=?, STOCK_STATUS=?, NOTES=?, TASK_ASSIGMENT=?
WHERE INVENTORY_ID=?;`, [ inventory_name, category, exp_date, stock_status, notes, task_assigment, id ]);
}

const deleteInventorybyId = async (item_id) => {
    const [ rows, fields ] = await connection.query(`DELETE FROM foodash.INVENTORY
WHERE INVENTORY_ID=?;`, [ item_id ]);
    return rows;
}
module.exports = {
    getAllInventories,
    createInventory,
    updateInventory,
    deleteInventorybyId
}