const connection = require("../config/database");

const getAllorders = async () => {
  const [rows, fields] =
    await connection.query(`SELECT ORDER_ID, FULL_NAME, DUEDATE, RECIPIENT, ADDRESS, PHONE, EMAIL, DELIVER, PAYMENT, TAXES, DELIVERY_FEE, SERVICE_FEE, UTENSIL, GIFTWRAP, PROMO, SUBTOTAL, ORDER_ITEM_ID, CREATED_DATE, TOTAL
FROM foodash.ORDER_VIEW;`);
  return { rows, fields };
};

const getAllOrderDetails = async (orderId) => {
  const [rows, fields] = await connection.query(
    `SELECT ORDER_ID, ITEM_ID, ITEM_NAME, PICTURE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL
FROM foodash.ORDER_DETAIL_VIEW WHERE ORDER_ID=?;`,
    [orderId]
  );
  return { rows, fields };
};

module.exports = { getAllorders, getAllOrderDetails };
