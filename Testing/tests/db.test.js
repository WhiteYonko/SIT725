const { addOrder, getOrders } = require('../models/MongoDB');
const MongoClient = require('mongodb').MongoClient;

describe('Database Operations', () => {
  
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('orderDatabase');
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Should insert a new order into the database', async () => {
    const orderData = { product: 'Chocolate Ice Cream', quantity: 2 };
    const result = await addOrder(orderData);
    expect(result.insertedId).toBeDefined();
  });

  test('Should retrieve orders from the database', async () => {
    const orders = await getOrders();
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
  });

  test('Should fail to add an order with invalid data', async () => {
    const invalidOrderData = {}; // No product or quantity
    try {
      await addOrder(invalidOrderData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  
  test('Should return an empty array when there are no orders', async () => {
    const orders = await db.collection('orders').deleteMany({});
    const emptyOrders = await getOrders();
    expect(emptyOrders).toEqual([]);
  });
});
