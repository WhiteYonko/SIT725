const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);
const dbName = 'orderDatabase'; 

app.use(express.static('public'));
app.use(express.json());

app.get("/getCardContent", (req, res) => {
    res.send("Did you know Chocolate ice cream was invented before vanilla.");
});

async function connectToDatabase() {
    await client.connect();
    console.log('Connected to MongoDB');
}

connectToDatabase();

app.post('/addOrder', async (req, res) => {
    const { name, phone, email, flavor, location } = req.body;
    try {
        const db = client.db(dbName);
        const collection = db.collection('orders');
        const result = await collection.insertOne({ name, phone, email, flavor, location });
        res.json({ status: 'Order added successfully', orderId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Failed to add order' });
    }
});

app.get('/getOrders', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('orders');
        const orders = await collection.find({}).toArray();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Failed to retrieve orders' });
    }
});

const port = 3040;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
