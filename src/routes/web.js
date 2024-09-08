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

const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsAPI);
router.get('/inventory', getAllInventoryAPI);

router.post('/item/create', createItemAPI);
router.post('/inventory/create', createInventoryAPI);

router.put('/item/update/:id', updateItemAPI);
router.put('/inventory/update/:id', updateInventoryAPI);

router.delete('/item/delete/:id', deleteItemAPI);
router.delete('/inventory/delete/:id', deleteInventoryAPI);

module.exports = router;