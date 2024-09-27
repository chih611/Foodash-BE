// const connection = require('../config/database');
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItembyId,
  getItemByCategory,
  searchItemByName,
} = require("../services/itemService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");
// const { get } = require("../routes/web");

const getHomePage = (req, res) => {
  return res.render("home");
};

const getAllItemsAPI = async (req, res) => {
  const { rows } = await getAllItems();
  await handleGetAllAPI(res, rows);
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
  const { categoryName } = req.params; // Extract categoryName from URL params
  try {
    const rows = await getItemByCategory(categoryName);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No items found for this category" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching items by category" });
  }
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

module.exports = {
  getHomePage,
  getAllItemsAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  getItemByCategoryAPI,
  searchItemByNameAPI,
};
