const {
  getAllorders,
  findOrderDetailByOrderId,
  findOrderByOrderId,
  updateStatusOrderbyId,
  findOrderByCustomerName,
  createOrder,
  createOrderDetail,
  getOrderByCustomerId,
  updateOrderById,
  findOrderByDuedate,
  findOrderByOrdersTableById,
  updateOrderViewById,
  getAllordersByToday,
  getAllordersThisMonth,
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

const getAllordersThisMonthAPI = async (req, res) => {
  const { rows } = await getAllordersThisMonth();
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

const findOrderByOrdersTableByIdAPI = async (req, res) => {
  const { orderId } = req.params;
  const { rows } = await findOrderByOrdersTableById(orderId);

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

const updateOrderByIdAPI = async (req, res) => {
  const { orderId } = req.params;
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
    RECURRING,
    UPDATED,
    FEEDBACK,
  } = req.body;

  try {
    const { rows } = await updateOrderById(
      orderId,
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
      RECURRING,
      UPDATED,
      FEEDBACK
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found." });
    }
    await res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};

const updateOrderViewByIdAPI = async (req, res) => {
  const { orderId } = req.params;
  const {
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
    PROMOTION,
    SUBTOTAL,
    CREATE_DATE,
    TOTAL,
    STATUS,
  } = req.body;

  try {
    const { rows } = await updateOrderViewById(
      orderId,
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
      PROMOTION,
      SUBTOTAL,
      CREATE_DATE,
      TOTAL,
      STATUS
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order" });
  }
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
  updateOrderByIdAPI,
  getAllOrdersByTodayAPI,
  updateOrderViewByIdAPI,
};
