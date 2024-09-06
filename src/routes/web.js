const express = require('express');

const { getHomePage,
    getAllItemsPage,
    createItemPage,
    createItemByFormPage } = require('../controllers/itemControllers');
const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsPage);
router.get('/item/create/', createItemPage);
router.post('/item/create/view', createItemByFormPage);

module.exports = router;