const express = require('express');
const { getItems } = require('../controllers/itemControllers');
const router = express.Router();
const connection = require('../config/database');

router.get('/item', getItems);

module.exports = router;