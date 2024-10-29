const connection = require("../config/database");

const getAllorders = async () => {
  const [rows] = await connection.query(
    "SELECT ID, `Full Name`, Duedate, `Create Date`, Total, Status, Recurring FROM foodash.Order_view;"
  );
  return { rows };
};

const getAllordersByToday = async () => {
  const [rows] = await connection.query(
    "SELECT ID,Duedate,  `Create Date`, Status FROM foodash.Order_view WHERE DATE(`Create Date`) = CURDATE() OR (`Duedate`) = CURDATE();"
  );
  return { rows };
};

const getAllordersThisMonth = async () => {
  const [rows] = await connection.query(
    "SELECT `Product Sales`, Credit, Cash, `Gift Card`, Other, Fees FROM foodash.Report_summary_byMonth WHERE `Month` = MONTH(CURDATE());"
  );
  return { rows };
};

const getOrderByCustomerId = async (customerId) => {
  const [rows] = await connection.query(
    "SELECT ID, `Full Name`, Duedate, Recipient, Address, Phone, Email, Deliver, Payment, Taxes, `Delivery Fee`, `Service Fee`, UTENSIL, Giftwrap, Promotion, Subtotal, `Create Date`, Total, Status, Updated, Feedback, Refund, Recurring FROM foodash.Order_view WHERE CustomerID=?;",
    [customerId]
  );
  return { rows };
};

const getCountOrderByCustomerId = async () => {
  const [rows] = await connection.query(
    "SELECT CUSTOMER_ID, COUNT(ORDER_ID) AS total_orders FROM foodash.ORDERS GROUP BY CUSTOMER_ID;"
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

const updateOrderViewById = async (
  orderId,
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
  PROMOTION,
  SUBTOTAL,
  CREATE_DATE,
  TOTAL,
  STATUS
) => {
  const [rows] = await connection.query(
    `UPDATE foodash.Order_view 
     SET 
       Duedate = ?, 
       Recipient = ?, 
       Address = ?, 
       Phone = ?, 
       Email = ?, 
       Deliver = ?, 
       Payment = ?, 
       Taxes = ?, 
       \`Delivery Fee\` = ?, 
       \`Service Fee\`= ?, 
       UTENSIL = ?, 
       Giftwrap = ?, 
       Promotion = ?, 
       Subtotal = ?, 
       \`Create Date\` = ?, 
       Total = ?, 
       Status = ? 
     WHERE ID = ?;`,
    [
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
      PROMOTION,
      SUBTOTAL,
      CREATE_DATE,
      TOTAL,
      STATUS,
      orderId,
    ]
  );
  return { rows };
};

const findOrderDetailByOrderId = async (orderId) => {
  const [rows] = await connection.query(
    `SELECT * FROM foodash.Order_detail_view WHERE ID=?;`,
    [orderId]
  );
  return { rows };
};

const findOrderByOrdersTableById = async (orderId) => {
  const [rows] = await connection.query(
    `SELECT * FROM foodash.ORDERS WHERE ORDER_ID=?;`,
    [orderId]
  );
  return { rows };
};

const findOrderByOrderId = async (orderId) => {
  const [rows] = await connection.query(
    `SELECT * FROM foodash.Order_view WHERE ID=?;`,
    [orderId]
  );
  return { rows };
};

const findOrderByCustomerName = async (full_name) => {
  const [rows] = await connection.query(
    "SELECT * FROM foodash.Order_view WHERE `Full Name`=?;",
    [full_name]
  );
  return { rows };
};

const updateStatusOrderbyId = async (status, orderId) => {
  const [rows] = await connection.query(
    `UPDATE foodash.Order_view SET Status=? WHERE ID=?;`,
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
      MODIFICATION,
    ]
  );
  return { rows };
};

module.exports = {
  getAllorders,
  getAllordersByToday,
  findOrderDetailByOrderId,
  findOrderByOrderId,
  updateStatusOrderbyId,
  findOrderByCustomerName,
  createOrder,
  createOrderDetail,
  getOrderByCustomerId,
  updateOrderById,
  updateOrderViewById,
  findOrderByOrdersTableById,
  getAllordersThisMonth,
  getCountOrderByCustomerId,
};
