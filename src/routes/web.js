const express = require('express');

const { getHomePage,
    getAllItemsPage,
    createItemPage,
    createItemPostPage } = require('../controllers/itemControllers');
const router = express.Router();

router.get('/', getHomePage);
router.get('/item', getAllItemsPage);
router.get('/item/create/view', createItemPage);
router.post('/item/create', createItemPostPage);

module.exports = router;