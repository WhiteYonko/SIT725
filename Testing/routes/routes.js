const express = require('express');
const { handleAddOrder, handleGetOrders } = require('../controllers/controllers');  

const router = express.Router();

router.post('/addOrder', handleAddOrder);
router.get('/getOrders', handleGetOrders);

module.exports = router;
