const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url); 
const dbName = 'orderDatabase';

let dbConnection = null; 

async function connectToDatabase() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db(dbName);  
        console.log('Connected to MongoDB');
    }
    return dbConnection;
}

async function addOrder(orderData) {
    const db = await connectToDatabase();  
    const collection = db.collection('orders');
    return await collection.insertOne(orderData);
}

async function getOrders() {
    const db = await connectToDatabase();  
    const collection = db.collection('orders');
    return await collection.find({}).toArray();
}

module.exports = { addOrder, getOrders };
