const connection = require("../config/database");

const getAllorders = async () => {
  const [rows] = await connection.query(
    "SELECT ID, `Full Name`, Duedate, `Create Date`, Total, Status FROM foodash.ORDER_VIEW;"
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

module.exports = { getAllorders, findOrderDetailByOrderId, findOrderByOrderId };
