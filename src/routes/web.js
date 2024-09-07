const express = require('express');

const { getHomePage,
    getAllItemsAPI,
    createItemPage,
    createItemAPI,
    updateItemPage,
    updateItemAPI,
    deleteItemPage,
    deleteItemAPI } = require('../controllers/itemControllers');
const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsAPI);

router.post('/item/create', createItemAPI);

router.put('/item/update/:id', updateItemAPI);

router.delete('/item/delete/:id', deleteItemAPI);

module.exports = router;