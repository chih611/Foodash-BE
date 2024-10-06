const {
  getAllorders,
  getAllOrderDetails,
} = require("../services/orderService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

const getAllOrdersAPI = async (req, res) => {
  const { rows, fields } = await getAllorders();
  await handleGetAllAPI(res, rows, fields);
};

const getAllOrderDetailsAPI = async (req, res) => {
  const { orderId } = req.params;
  const { rows, fields } = await getAllOrderDetails(orderId);
  await handleGetAllAPI(res, rows, fields);
};

module.exports = {
  getAllOrdersAPI,
  getAllOrderDetailsAPI,
};
