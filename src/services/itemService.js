const connection = require("../config/database");

const getAllItems = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM ITEMS");
  return { rows, fields };
};

const createItem = async (
  name,
  quantity,
  price,
  category_id,
  description,
  special
) => {
  const [rows] = await connection.query(
    `INSERT INTO ITEMS 
    (ITEM_NAME, QUANTITY, UNIT_PRICE, CATEGORY_ID, DESCRIPTION, SPECIAL_STATUS)
VALUES(?, ?, ?, ?, ?, ?);`,
    [name, quantity, price, category_id, description, special]
  );
  return { rows };
};

const updateItem = async (itemId, itemName, price) => {
  await connection.query(`UPDATE ITEMS SET ITEM_NAME = ? WHERE ITEM_ID = ?;`, [
    itemName,
    price,
    itemId,
  ]);
};

const getItemById = async (item_id) => {
  const [rows] = await connection.query(
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

const updateModificationByItemId = async (
  ModId,
  itemId,
  modification,
  ingredients,
  labelId
) => {
  console.log(
    `Updating Modification with ModId: ${ModId}, modification: ${modification}, ingredients: ${ingredients}, labelId: ${labelId}`
  );
  const [result] = await connection.query(
    `UPDATE ITEM_MODIFICATION SET MODIFICATION = ?, ITEM_ID = ?, INGREDIENTS = ?, LABEL_ID = ? WHERE MOD_ID = ?;`,
    [modification, itemId, ingredients, labelId, ModId]
  );
  console.log(`Update Result: ${JSON.stringify(result)}`);
  return result;
};

const createItemModificationByItemId = async (
  itemId,
  modification,
  ingredients,
  labelId
) => {
  const [rows] = await connection.query(
    `INSERT INTO ITEM_MODIFICATION 
    (ITEM_ID, MODIFICATION, INGREDIENTS, LABEL_ID)
VALUES(?, ?, ?, ?);`,
    [itemId, modification, JSON.stringify(ingredients), labelId]
  );
  return { rows };
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

const getAllAdminItems = async () => {
  const [rows] = await connection.query(
    "SELECT Picture,ID, Name, Quantity, `Unit price`, `Expiry date`, `Special status` FROM Product_view"
  );
  return { rows };
};

const getAdminItemDetail = async (item_id) => {
  const [rows] = await connection.query(
    "SELECT * FROM foodash.Product_view WHERE ID = ?;",
    [item_id]
  );
  return { rows };
};

const getAdminModificationbyId = async (mod_id) => {
  const [rows] = await connection.query(
    "SELECT ModID, ItemID, Modification, Ingredients, `Label name`, Labels FROM foodash.Modification_view WHERE ItemID = ?;",
    [mod_id]
  );
  return { rows };
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
  getAllAdminItems,
  getAdminItemDetail,
  getAdminModificationbyId,
  updateModificationByItemId,
  createItemModificationByItemId,
};
