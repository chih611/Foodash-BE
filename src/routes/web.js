const express = require('express');

const { getHomePage,
    getAllItemsAPI,
    createItemAPI,
    updateItemAPI,
    deleteItemAPI
} = require('../controllers/itemController');

const { getAllInventoryAPI,
    createInventoryAPI,
    updateInventoryAPI,
    deleteInventoryAPI
} = require('../controllers/inventoryController');

const { getAllCustomersAPI,
    createCustomerAPI,
    updateCustomerAPI,
    deleteCustomerAPI
} = require('../controllers/customerController');

const { getAllCartsAPI,
    createCartAPI,
    updateCartAPI,
    deleteCartAPI
} = require('../controllers/cartController');


const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsAPI);
router.get('/inventory', getAllInventoryAPI);
router.get('/customer', getAllCustomersAPI);
router.get('/cart', getAllCartsAPI);

router.post('/item/create', createItemAPI);
router.post('/inventory/create', createInventoryAPI);
router.post('/customer/create', createCustomerAPI);
router.post('/cart/create', createCartAPI);

router.put('/item/update/:id', updateItemAPI);
router.put('/inventory/update/:id', updateInventoryAPI);
router.put('/customer/update/:id', updateCustomerAPI);
router.put('/cart/update/:id', updateCartAPI);

router.delete('/item/delete/:id', deleteItemAPI);
router.delete('/inventory/delete/:id', deleteInventoryAPI);
router.delete('/customer/delete/:id', deleteCustomerAPI);
router.delete('/cart/delete/:id', deleteCartAPI);

module.exports = router;