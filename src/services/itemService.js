const connection = require("../config/database");

const getAllItems = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM ITEMS");
  return { rows, fields };
};

const createItem = async (
  item_name,
  quantity,
  unit_price,
  category_id,
  picture,
  description,
  expiry_date,
  special_status
) => {
  const query = `
    INSERT INTO ITEMS (ITEM_NAME, QUANTITY, UNIT_PRICE, CATEGORY_ID, PICTURE, DESCRIPTION, EXPIRY_DATE, SPECIAL_STATUS) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await connection.query(query, [
    item_name,
    quantity,
    unit_price,
    category_id,
    picture,
    description,
    expiry_date,
    special_status,
  ]);
};

// Revised updateItem to include all attributes and image upload
const updateItem = async (
  itemId,
  item_name,
  quantity,
  unit_price,
  category_id,
  picture,
  description,
  expiry_date,
  special_status
) => {
  const query = `
    UPDATE ITEMS 
    SET ITEM_NAME = ?, QUANTITY = ?, UNIT_PRICE = ?, CATEGORY_ID = ?, PICTURE = ?, DESCRIPTION = ?, EXPIRY_DATE = ?, SPECIAL_STATUS = ?
    WHERE ITEM_ID = ?
  `;
  await connection.query(query, [
    item_name,
    quantity,
    unit_price,
    category_id,
    picture,
    description,
    expiry_date,
    special_status,
    itemId,
  ]);
};

const getItemById = async (item_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM ITEMS WHERE ITEM_ID = ?;`,
    [item_id]
  );
  return rows;
};

const getAllIngredients = async () => {
  const [rows, fields] = await connection.query(
    "SELECT INGREDIENTS FROM ITEM_MODIFICATION"
  );

  // Return all ingredients as they are from the database
  return rows;
};

const getItemByCategory = async (category_id) => {
  try {
    console.log(`Fetching items for category ID: ${category_id}`);
    const [rows, fields] = await connection.query(
      `SELECT * FROM ITEMS WHERE CATEGORY_ID = ?`,
      [category_id]
    );

    if (rows.length === 0) {
      console.log(`No items found for category ID: ${category_id}`);
      throw new Error("No items found for the given category");
    }

    return rows;
  } catch (error) {
    console.error(`Error fetching items by category: ${error.message}`);
    throw error;
  }
};

// itemService.js
const searchItemByName = async (item_name) => {
  try {
    // Check if item_name is defined
    if (!item_name) {
      throw new Error("Item name is required");
    }

    // Modify the query to handle case insensitivity, spaces, and potential special characters
    const [rows, fields] = await connection.query(
      `SELECT * FROM ITEMS WHERE LOWER(ITEM_NAME) LIKE ?;`,
      [`%${item_name.toLowerCase().trim()}%`]
    );

    console.log("Search results:", rows); // Debugging log to check the retrieved data

    return rows;
  } catch (error) {
    console.error(`Error searching item by name: ${error.message}`);
    throw error;
  }
};

const getAllModifications = async () => {
  const [rows, fields] = await connection.query(
    "SELECT * FROM ITEM_MODIFICATION"
  );
  return { rows, fields };
};

const deleteItembyId = async (item_id) => {
  const [rows, fields] = await connection.query(
    `DELETE FROM ITEMS WHERE ITEM_ID = ?;`,
    [item_id]
  );
  return rows;
};

const getModificationById = async (item_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM ITEM_MODIFICATION WHERE ITEM_ID = ?;`,
    [item_id]
  );
  return rows;
};

const getAllLabels = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM LABELS");
  return { rows, fields };
};
module.exports = {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItembyId,
  getItemByCategory,
  getModificationById,
  searchItemByName,
  getAllLabels,
  getAllIngredients,
  getAllModifications,
};
