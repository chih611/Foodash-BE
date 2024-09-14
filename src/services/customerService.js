const connection = require('../config/database');

const getAllCustomers = async () => {
    const [ rows, fields ] = await connection.query('SELECT * FROM CUSTOMER');
    return { rows, fields };
}

const createCustomer = async (customer_name) => {
    await connection.query(`INSERT INTO foodash.CUSTOMER
(CUSTOMER_NAME)
VALUES( ?);`, [ customer_name ]);
}

const updateCustomer = async (customer_name, customer_id) => {
    await connection.query(`UPDATE foodash.CUSTOMER
SET CUSTOMER_NAME=?
WHERE CUSTOMER_ID=?;`, [ customer_name, customer_id ]);
}

// const getItemById = async (item_id) => {
//     const [ rows, fields ] = await connection.query(`SELECT * FROM ITEMS WHERE ITEM_NAME = ?;`, [ item_id ]);
//     return rows;
// }

const deleteCustomerById = async (customer_id) => {
    const [ rows, fields ] = await connection.query(`DELETE FROM foodash.CUSTOMER
WHERE CUSTOMER_ID=?;`, [ customer_id ]);
    return rows;
}
module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomerById
}