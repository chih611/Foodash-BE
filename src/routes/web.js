const express = require('express');

const { getHome, getItems, createItem } = require('../controllers/itemControllers');
const router = express.Router();

router.get('/', getHome);
router.get('/item', getItems);
router.get('/item/create', createItem);

module.exports = router;