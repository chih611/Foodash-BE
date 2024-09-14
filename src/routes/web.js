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


const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsAPI);
router.get('/inventory', getAllInventoryAPI);
router.get('/customer', getAllCustomersAPI);

router.post('/item/create', createItemAPI);
router.post('/inventory/create', createInventoryAPI);
router.post('/customer/create', createCustomerAPI);

router.put('/item/update/:id', updateItemAPI);
router.put('/inventory/update/:id', updateInventoryAPI);
router.put('/customer/update/:id', updateCustomerAPI);

router.delete('/item/delete/:id', deleteItemAPI);
router.delete('/inventory/delete/:id', deleteInventoryAPI);
router.delete('/customer/delete/:id', deleteCustomerAPI);

module.exports = router;