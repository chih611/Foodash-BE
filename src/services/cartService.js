const connection = require("../config/database");

// Retrieve all carts
const getAllCarts = async () => {
  const [rows] = await connection.query("SELECT * FROM CART");
  return rows;
};

// Create a new cart
const createCart = async ({
  customerId,
  cartItems,
  cartStatus = "pending",
  cartTotal,
}) => {
  const sql = `
        INSERT INTO CART (CUSTOMER_ID, CART_ITEMS, CART_STATUS, CART_TOTAL) 
        VALUES (?, ?, ?, ?);
    `;
  const values = [
    customerId,
    JSON.stringify(cartItems), // Convert the cart items to JSON string
    cartStatus,
    cartTotal,
  ];

  await connection.query(sql, values);
};

// Update existing cart
const updateCart = async ({
  cartId,
  customerId,
  cartItems,
  cartStatus,
  cartTotal,
}) => {
  const sql = `
        UPDATE CART 
        SET 
            CUSTOMER_ID = ?, 
            CART_ITEMS = ?, 
            CART_STATUS = ?, 
            CART_TOTAL = ? 
        WHERE CART_ID = ?;
    `;
  const values = [
    customerId,
    JSON.stringify(cartItems), // Convert the cart items to JSON string
    cartStatus,
    cartTotal,
    cartId,
  ];

  await connection.query(sql, values);
};

// Delete a cart by ID
const deleteCartById = async (cartId) => {
  await connection.query(`DELETE FROM CART WHERE CART_ID=?;`, [cartId]);
};

module.exports = {
  getAllCarts,
  createCart,
  updateCart,
  deleteCartById,
};
