const { handleGetAllAPI } = require("../models/handlingModel");
const { getAllCurrentCategorySales } = require("../services/reportService");

const getAllCurrentCategorySalesAPI = async (req, res) => {
  const { rows } = await getAllCurrentCategorySales();
  await handleGetAllAPI(res, rows);
};

module.exports = {
  getAllCurrentCategorySalesAPI,
};
