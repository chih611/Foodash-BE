const connection = require('../config/database');

const getAllCarts = async () => {
    const [ rows, fields ] = await connection.query('SELECT * FROM CART');
    return { rows, fields };
}

const createCart = async (item_id, customer_id) => {
    await connection.query(`INSERT INTO foodash.CART
(ITEM_ID, CUSTOMER_ID)
VALUES(?,?);`, [ item_id, customer_id ]);
}

const updateCart = async (item_id, customer_id, cart_id) => {
    await connection.query(`UPDATE foodash.CART
SET ITEM_ID=?, CUSTOMER_ID=?
WHERE CART_ID=?;`, [ item_id, customer_id, cart_id ]);
}

// const getItemById = async (item_id) => {
//     const [ rows, fields ] = await connection.query(`SELECT * FROM ITEMS WHERE ITEM_NAME = ?;`, [ item_id ]);
//     return rows;
// }

const deleteCartById = async (cart_id) => {
    const [ rows, fields ] = await connection.query(`DELETE FROM foodash.CART
WHERE CART_ID=?;`, [ cart_id ]);
    return rows;
}
module.exports = {
    getAllCarts,
    createCart,
    updateCart,
    deleteCartById
}