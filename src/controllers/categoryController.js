const {
  getAllCategories,
  createCategory,
  getItemByCategory,
  updateItem,
  deleteItembyId,
} = require("../services/categoryService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

const getAllCategoriesAPI = async (req, res) => {
  const { rows } = await getAllCategories();
  await handleGetAllAPI(res, rows);
};

const createCategoryAPI = async (req, res) => {
  const { category_name } = req.query;
  await createCategory(category_name);
  await handleCreateAPI(res);
};

module.exports = {
  getAllCategoriesAPI,
  createCategoryAPI,
};
