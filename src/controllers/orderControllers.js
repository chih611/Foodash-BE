const {
  getAllorders,
  findOrderDetailByOrderId,
  findOrderByOrderId,
  updateStatusOrderbyId,
  findOrderByCustomerName,
  createOrder,
  createOrderDetail,
  getOrderByCustomerId,
  findOrderByDuedate,
  getAllordersByToday,
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

const getAllOrdersByTodayAPI = async (req, res) => {
  const { rows } = await getAllordersByToday();
  await handleGetAllAPI(res, rows);
};

const getOrderByCustomerIdAPI = async (req, res) => {
  const { customerId } = req.params;
  const { rows } = await getOrderByCustomerId(customerId);
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

const findOrderByDuedateAPI = async (req, res) => {
  const { duedate } = req.params;
  const { rows } = await findOrderByDuedate(duedate);
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
  try {
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
    const orderId = rows.insertId;
    await res.status(201).json({ ORDER_ID: orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

const createOrderDetailAPI = async (req, res) => {
  const {
    ORDER_ID,
    UNIT_PRICE,
    TOTAL,
    QUANTITY,
    LABEL_ID,
    NOTES,
    ITEM_ID,
    MODIFICATION,
  } = req.body;
  const { rows } = await createOrderDetail(
    ORDER_ID,
    UNIT_PRICE,
    TOTAL,
    QUANTITY,
    LABEL_ID,
    NOTES,
    ITEM_ID,
    MODIFICATION
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
  getOrderByCustomerIdAPI,
  findOrderByDuedateAPI,
  getAllOrdersByTodayAPI,
};
