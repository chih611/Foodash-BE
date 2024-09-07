const express = require('express');

const { getHomePage,
    getAllItemsPage,
    createItemPage,
    createItemAPI,
    updateItemPage,
    updateItemAPI,
    deleteItemPage,
    deleteItemAPI } = require('../controllers/itemControllers');
const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsPage);
router.get('/item/create/view', createItemPage);
router.get('/item/update/view/:id', updateItemPage);
router.get('/item/delete/view/:id', deleteItemPage);

router.post('/item/create', createItemAPI);
router.put('/item/update/:id', updateItemAPI);
router.delete('/item/delete/:id', deleteItemAPI);

module.exports = router;