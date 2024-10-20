// const connection = require('../config/database');
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItembyId,
  getItemByCategory,
  searchItemByName,
  getModificationById,
  getItemById,
  getAllLabels,
  getAllIngredients,
  getAllModifications,
} = require("../services/itemService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

// const getHomePage = (req, res) => {
//   return res.render("home");
// };

const getAllItemsAPI = async (req, res) => {
  const { rows } = await getAllItems();
  await handleGetAllAPI(res, rows);
};

const getItemByIdAPI = async (req, res) => {
  const { id } = req.params;
  const rows = await getItemById(id);
  if (rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: "No items found" });
  }
};

const createItemAPI = async (req, res) => {
  const { item_name, price } = req.query;
  await createItem(item_name, price);
  await handleCreateAPI(res);
};

const updateItemAPI = async (req, res) => {
  const { id } = req.params;
  const { item_name, price } = req.query;
  await updateItem(id, item_name, price);
  await handleUpdateAPI(res);
};

const deleteItemAPI = async (req, res) => {
  const { id } = req.params;
  await deleteItembyId(id);
  await handleDeleteAPI(res, id);
};

const getItemByCategoryAPI = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const items = await getItemByCategory(categoryId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getModificationByIdAPI = async (req, res) => {
  const { id } = req.params;
  const rows = await getModificationById(id);
  if (rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: "No items found" });
  }
};

const getAllModificationsAPI = async (req, res) => {
  const { rows } = await getAllModifications();
  await handleGetAllAPI(res, rows);
};

const searchItemByNameAPI = async (req, res) => {
  const { itemName } = req.params;
  try {
    const rows = await searchItemByName(itemName);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No items found for this search" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching items by name" });
  }
};

const getAllLabelsAPI = async (req, res) => {
  const { rows } = await getAllLabels();
  await handleGetAllAPI(res, rows);
};

const getAllIngredientsAPI = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error(`Error fetching ingredients: ${error.message}`);
    res.status(500).json({ message: "Error fetching ingredients" });
  }
};

module.exports = {
  getAllItemsAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  getItemByIdAPI,
  getItemByCategoryAPI,
  getModificationByIdAPI,
  searchItemByNameAPI,
  getAllLabelsAPI,
  getAllIngredientsAPI,
  getAllModificationsAPI,
};
