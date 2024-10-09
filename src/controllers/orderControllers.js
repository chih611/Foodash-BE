const {
  getAllorders,
  findOrderDetailByOrderId,
  findOrderByOrderId,
  updateStatusOrderbyId,
  findOrderByCustomerName,
  createOrder,
  createOrderDetail,
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

const findOrderByCustomerNameAPI = async (req, res) => {
  const { full_name } = req.params;
  const { rows } = await findOrderByCustomerName(full_name);
  await handleGetAllAPI(res, rows);
};

const updateStatusOrderbyIdAPI = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const { rows } = await updateStatusOrderbyId(status, orderId);
  await handleUpdateAPI(res, rows);
};

const createOrderAPI = async (req, res) => {
  const {
    CUSTOMER_ID,
    DUEDATE,
    RECIPIENT,
    ADDRESS,
    PHONE,
    EMAIL,
    DELIVER,
    PAYMENT,
    TAXES,
    DELIVERY_FEE,
    SERVICE_FEE,
    UTENSIL,
    GIFTWRAP,
    PROMO,
    SUBTOTAL,
    ORDER_ITEM_ID,
    CREATED_DATE,
    TOTAL,
    NOTES,
    STATUS,
  } = req.body;
  const { rows } = await createOrder(
    CUSTOMER_ID,
    DUEDATE,
    RECIPIENT,
    ADDRESS,
    PHONE,
    EMAIL,
    DELIVER,
    PAYMENT,
    TAXES,
    DELIVERY_FEE,
    SERVICE_FEE,
    UTENSIL,
    GIFTWRAP,
    PROMO,
    SUBTOTAL,
    ORDER_ITEM_ID,
    CREATED_DATE,
    TOTAL,
    NOTES,
    STATUS
  );
  await handleCreateAPI(res, rows);
};

const createOrderDetailAPI = async (req, res) => {
  const { ORDER_ID, UNIT_PRICE, TOTAL, QUANTITY, LABEL_ID, NOTES, ITEM_ID } =
    req.body;
  const { rows } = await createOrderDetail(
    ORDER_ID,
    UNIT_PRICE,
    TOTAL,
    QUANTITY,
    LABEL_ID,
    NOTES,
    ITEM_ID
  );
  await handleCreateAPI(res, rows);
};


module.exports = {
  getAllOrdersAPI,
  findOrderDetailByOrderIdAPI,
  findOrderByOrderIdAPI,
  updateStatusOrderbyIdAPI,
  findOrderByCustomerNameAPI,
  createOrderAPI,
  createOrderDetailAPI,
};
