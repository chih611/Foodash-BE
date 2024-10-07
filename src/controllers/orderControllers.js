const {
  getAllorders,
  findOrderDetailByOrderId,
  findOrderByOrderId,
} = require("../services/orderService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

const getAllOrdersAPI = async (req, res) => {
  const { rows } = await getAllorders();
  await handleGetAllAPI(res, rows);
};

const findOrderDetailByOrderIdAPI = async (req, res) => {
  const { orderId } = req.params;
  const { rows } = await findOrderDetailByOrderId(orderId);
  await handleGetAllAPI(res, rows);
};

const findOrderByOrderIdAPI = async (req, res) => {
  const { orderId } = req.params;
  const { rows } = await findOrderByOrderId(orderId);
  await handleGetAllAPI(res, rows);
};

module.exports = {
  getAllOrdersAPI,
  findOrderDetailByOrderIdAPI,
  findOrderByOrderIdAPI,
};
