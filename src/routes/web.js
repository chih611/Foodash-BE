const express = require("express");

const {
  getHomePage,
  getAllItemsAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  getItemByCategoryAPI,
  searchItemByNameAPI,
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
  updateCustomerAPI,
  deleteCustomerAPI,
} = require("../controllers/customerController");

const {
  getAllCartsAPI,
  createCartAPI,
  updateCartAPI,
  deleteCartAPI,
} = require("../controllers/cartController");

const {
  getAllCategoriesAPI,
  createCategoryAPI,
} = require("../controllers/categoryController");

const { createPaymentAPI } = require("../controllers/paymentController");

const router = express.Router();

// Define the routes as per requirements
router.get("/", getHomePage);
router.get("/item", getAllItemsAPI);
router.get("/items/category/:categoryName", getItemByCategoryAPI);
router.get("/items/search/:itemName", searchItemByNameAPI);
router.get("/inventory", getAllInventoryAPI);
router.get("/customer", getAllCustomersAPI);
router.get("/cart", getAllCartsAPI);
router.get("/category", getAllCategoriesAPI);

router.post("/item/create", createItemAPI);
router.post("/inventory/create", createInventoryAPI);
router.post("/customer/create", createCustomerAPI); // Customer create route
router.post("/cart/create", createCartAPI);
router.post("/category/create", createCategoryAPI);
router.post("/payment/create", createPaymentAPI);

router.put("/item/update/:id", updateItemAPI);
router.put("/inventory/update/:id", updateInventoryAPI);
router.put("/customer/update/:id", updateCustomerAPI); // Customer update route
router.put("/cart/update/:id", updateCartAPI);

router.delete("/item/delete/:id", deleteItemAPI);
router.delete("/inventory/delete/:id", deleteInventoryAPI);
router.delete("/customer/delete/:id", deleteCustomerAPI); // Customer delete route
router.delete("/cart/delete/:id", deleteCartAPI);

module.exports = router;
