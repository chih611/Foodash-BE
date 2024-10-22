const { handleGetAllAPI } = require("../models/handlingModel");
const {
  getAllCurrentCategorySales,
  getSalesSumByMonth,
} = require("../services/reportService");

const getAllCurrentCategorySalesAPI = async (req, res) => {
  const { rows } = await getAllCurrentCategorySales();
  await handleGetAllAPI(res, rows);
};

const getSalesSumByMonthAPI = async (req, res) => {
  const { rows } = await getSalesSumByMonth();
  await handleGetAllAPI(res, rows);
};

module.exports = {
  getAllCurrentCategorySalesAPI,
  getSalesSumByMonthAPI,
};
