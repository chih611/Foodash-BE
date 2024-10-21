const connection = require("../config/database");

const getAllorders = async () => {
  const [rows] = await connection.query(
    "SELECT ID, `Full Name`, Duedate, `Create Date`, Total, Status FROM foodash.ORDER_VIEW;"
  );
  return { rows };
};

const getOrderByCustomerId = async (customerId) => {
  const [rows] = await connection.query(
    "SELECT * FROM foodash.ORDERS WHERE CUSTOMER_ID=?;",
    [customerId]
  );
  return { rows };
};

const updateOrderById = async (
  orderId,
  CUSTOMER_ID,
  DUEDATE,
  RECIPIENT,
  ADDRESS,
  PHONE,
  EMAIL,
  DELIVER,
  PAYMENT,
  TAXES,
  DELIVERY_FEE,
  SERVICE_FEE,
  UTENSIL,
  GIFTWRAP,
  PROMO,
  SUBTOTAL,
  ORDER_ITEM_ID,
  CREATED_DATE,
  TOTAL,
  NOTES,
  STATUS,
  RECURRING,
  UPDATED,
  FEEDBACK
) => {
  const [rows] = await connection.query(
    `UPDATE foodash.ORDERS 
     SET CUSTOMER_ID = ?, DUEDATE = ?, RECIPIENT = ?, ADDRESS = ?, PHONE = ?, EMAIL = ?, DELIVER = ?, PAYMENT = ?, TAXES = ?, 
         DELIVERY_FEE = ?, SERVICE_FEE = ?, UTENSIL = ?, GIFTWRAP = ?, PROMO = ?, SUBTOTAL = ?, ORDER_ITEM_ID = ?, CREATED_DATE = ?, 
         TOTAL = ?, NOTES = ?, STATUS = ?, RECURRING = ?, UPDATED = ?, FEEDBACK = ?
     WHERE ORDER_ID = ?;`,
    [
      CUSTOMER_ID,
      DUEDATE,
      RECIPIENT,
      ADDRESS,
      PHONE,
      EMAIL,
      DELIVER,
      PAYMENT,
      TAXES,
      DELIVERY_FEE,
      SERVICE_FEE,
      UTENSIL,
      GIFTWRAP,
      PROMO,
      SUBTOTAL,
      ORDER_ITEM_ID,
      CREATED_DATE,
      TOTAL,
      NOTES,
      STATUS,
      RECURRING,
      UPDATED,
      JSON.stringify(FEEDBACK), // Convert JSON data to string if provided
      orderId,
    ]
  );

  return { rows };
};

const findOrderDetailByOrderId = async (orderId) => {
  const [rows] = await connection.query(
    `SELECT * FROM foodash.ORDER_DETAIL_VIEW WHERE ID=?;`,
    [orderId]
  );
  return { rows };
};

const findOrderByOrderId = async (orderId) => {
  const [rows] = await connection.query(
    `SELECT * FROM foodash.ORDER_VIEW WHERE ID=?;`,
    [orderId]
  );
  return { rows };
};

const findOrderByCustomerName = async (full_name) => {
  const [rows] = await connection.query(
    "SELECT * FROM foodash.ORDER_VIEW WHERE `Full Name`=?;",
    [full_name]
  );
  return { rows };
};

const updateStatusOrderbyId = async (status, orderId) => {
  const [rows] = await connection.query(
    `UPDATE foodash.ORDER_VIEW SET Status=? WHERE ID=?;`,
    [status, orderId]
  );
  return { rows };
};

const createOrder = async (
  CUSTOMER_ID,
  DUEDATE,
  RECIPIENT,
  ADDRESS,
  PHONE,
  EMAIL,
  DELIVER,
  PAYMENT,
  TAXES,
  DELIVERY_FEE,
  SERVICE_FEE,
  UTENSIL,
  GIFTWRAP,
  PROMO,
  SUBTOTAL,
  ORDER_ITEM_ID,
  CREATED_DATE,
  TOTAL,
  NOTES,
  STATUS
) => {
  const [rows] = await connection.query(
    "INSERT INTO foodash.ORDERS (CUSTOMER_ID, DUEDATE, RECIPIENT, ADDRESS, PHONE, EMAIL, DELIVER, PAYMENT, TAXES, DELIVERY_FEE, SERVICE_FEE, UTENSIL, GIFTWRAP, PROMO, SUBTOTAL, ORDER_ITEM_ID, CREATED_DATE, TOTAL, NOTES, STATUS) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      CUSTOMER_ID,
      DUEDATE,
      RECIPIENT,
      ADDRESS,
      PHONE,
      EMAIL,
      DELIVER,
      PAYMENT,
      TAXES,
      DELIVERY_FEE,
      SERVICE_FEE,
      UTENSIL,
      GIFTWRAP,
      PROMO,
      SUBTOTAL,
      ORDER_ITEM_ID,
      CREATED_DATE,
      TOTAL,
      NOTES,
      STATUS,
    ]
  );
  return { rows };
};

const createOrderDetail = async (
  ORDER_ID,
  UNIT_PRICE,
  TOTAL,
  QUANTITY,
  LABEL_ID,
  NOTES,
  ITEM_ID,
  MODIFICATION
) => {
  const [rows] = await connection.query(
    "INSERT INTO foodash.ORDER_ITEM (ORDER_ID, UNIT_PRICE, TOTAL, QUANTITY, LABEL_ID, NOTES, ITEM_ID, MODIFICATION) VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
    [
      ORDER_ID,
      UNIT_PRICE,
      TOTAL,
      QUANTITY,
      LABEL_ID,
      NOTES,
      ITEM_ID,
      JSON.stringify(MODIFICATION),
    ]
  );
  return { rows };
};

module.exports = {
  getAllorders,
  findOrderDetailByOrderId,
  findOrderByOrderId,
  updateStatusOrderbyId,
  findOrderByCustomerName,
  createOrder,
  createOrderDetail,
  getOrderByCustomerId,
  updateOrderById,
};
