const connection = require("../config/database");

const getAllCategories = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM CATEGORY");
  return { rows, fields };
};

const createCategory = async (category_name) => {
  await connection.query(`INSERT INTO CATEGORY(CATEGORY_NAME) VALUES (?);`, [
    category_name,
  ]);
};

const updateItem = async (itemId, itemName, price) => {
  await connection.query(
    `UPDATE CATEGORY SET ITEM_NAME = ? WHERE ITEM_ID = ?;`,
    [itemName, price, itemId]
  );
};

const getItemById = async (item_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM CATEGORY WHERE ITEM_NAME = ?;`,
    [item_id]
  );
  return rows;
};

const getItemByCategory = async (category_name) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM CATEGORY WHERE CATEGORY_NAME = ?;`,
    [category_name]
  );
  return rows;
};

const deleteItembyId = async (item_id) => {
  const [rows, fields] = await connection.query(
    `DELETE FROM CATEGORY WHERE ITEM_ID = ?;`,
    [item_id]
  );
  return rows;
};
module.exports = {
  getAllCategories,
  createCategory,
  updateItem,
  getItemById,
  deleteItembyId,
  getItemByCategory,
};
