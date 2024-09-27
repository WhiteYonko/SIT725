const { addOrder, getOrders } = require('../models/MongoDB');

async function handleAddOrder(req, res) {
    try {
        const orderData = req.body;
        const result = await addOrder(orderData);
        res.json({ status: 'Order added successfully', orderId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Failed to add order' });
    }
}

async function handleGetOrders(req, res) {
    try {
        const orders = await getOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Failed to retrieve orders' });
    }
}

module.exports = { handleAddOrder, handleGetOrders };
