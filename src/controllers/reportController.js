const { handleGetAllAPI } = require("../models/handlingModel");
const {
  getAllCurrentCategorySales,
  getSalesSumByMonth,
  getSaleRports,
} = require("../services/reportService");

const getAllCurrentCategorySalesAPI = async (req, res) => {
  const { rows } = await getAllCurrentCategorySales();
  await handleGetAllAPI(res, rows);
};

const getSalesSumByMonthAPI = async (req, res) => {
  const { month } = req.params;
  const { rows } = await getSalesSumByMonth(month);
  await handleGetAllAPI(res, rows);
};

const getSaleRportsAPI = async (req, res) => {
  const { rows } = await getSaleRports();
  await handleGetAllAPI(res, rows);
};

const getSaleMethodAPI = async (req, res) => {
  const { rows } = await getSaleRports();
  await handleGetAllAPI(res, rows);
};

module.exports = {
  getAllCurrentCategorySalesAPI,
  getSalesSumByMonthAPI,
  getSaleRportsAPI,
  getSaleMethodAPI,
};
