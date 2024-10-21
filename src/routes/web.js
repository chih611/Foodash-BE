const express = require("express");

const {
  getHomePage,
  getAllItemsAPI,
  getItemByIdAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  getItemByCategoryAPI,
  getModificationByIdAPI,
  searchItemByNameAPI,
  getAllLabelsAPI,
} = require("../controllers/itemController");

const {
  getAllInventoryAPI,
  createInventoryAPI,
  updateInventoryAPI,
  deleteInventoryAPI,
} = require("../controllers/inventoryController");

const {
  getAllCustomersAPI,
  createCustomerAPI,
  findCustomerByIdAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
  findCustomerByContactAPI,
  findCustomerByEmailAPI,
  signInCustomerAPI,
} = require("../controllers/customerController");

const {
  getAllCartsAPI,
  getCartByCustomerIdAPI,
  createCartAPI,
  updateCartAPI,
  deleteCartAPI,
} = require("../controllers/cartController");

const {
  getAllCategoriesAPI,
  createCategoryAPI,
} = require("../controllers/categoryController");

const { createPaymentAPI } = require("../controllers/paymentController");
const {
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
} = require("../controllers/orderControllers");
const {
  getAllNotificationsAPI,
} = require("../controllers/notificationController");

const router = express.Router();

// Define the routes as per requirements
router.get("/", getHomePage);
router.get("/item", getAllItemsAPI);
router.get("/item/:id", getItemByIdAPI);
router.get("/items/category/:categoryId", getItemByCategoryAPI);
router.get("/items/search/:itemName", searchItemByNameAPI);
router.get("/items/labels", getAllLabelsAPI);
router.get("/items/modification/:id", getModificationByIdAPI);
router.get("/customer", getAllCustomersAPI);
router.get("/customer/email/:email", findCustomerByEmailAPI);
router.get("/customer/contact/:phoneNumber", findCustomerByContactAPI);
router.get("/customer/:id", findCustomerByIdAPI);
router.get("/customer", getAllCustomersAPI);
router.get("/order", getAllOrdersAPI);
router.get("/order_details/:orderId", findOrderDetailByOrderIdAPI);
router.get("/order/:orderId", findOrderByOrderIdAPI);
router.get("/order/customer/:customerId", getOrderByCustomerIdAPI);
router.get("/order/customer/:full_name", findOrderByCustomerNameAPI);
router.get("/orders_today", getAllOrdersByTodayAPI);
router.get("/notification", getAllNotificationsAPI);


router.get("/cart", getAllCartsAPI);
router.get("/cart/customer/:customerId", getCartByCustomerIdAPI);
router.get("/category", getAllCategoriesAPI);
router.get("/inventory", getAllInventoryAPI);

router.post("/item/create", createItemAPI);
router.post("/inventory/create", createInventoryAPI);
router.post("/customer/create", createCustomerAPI);
router.post("/customer/signin", signInCustomerAPI);
router.post("/cart/create", createCartAPI);
router.post("/category/create", createCategoryAPI);
router.post("/payment/create", createPaymentAPI);
router.post("/order/create", createOrderAPI);
router.post("/order_detail/create", createOrderDetailAPI);

router.put("/item/update/:id", updateItemAPI);
router.put("/inventory/update/:id", updateInventoryAPI);
router.put("/customers/update/:id", updateCustomerAPI);
router.put("/cart/update/:id", updateCartAPI);
router.put("/order/update/:orderId", updateStatusOrderbyIdAPI);
router.put("/order/update_details/:orderId", updateOrderByIdAPI);

router.delete("/item/delete/:id", deleteItemAPI);
router.delete("/inventory/delete/:id", deleteInventoryAPI);
router.delete("/customer/delete/:id", deleteCustomerAPI);
router.delete("/cart/delete/:id", deleteCartAPI);

module.exports = router;
