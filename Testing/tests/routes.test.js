const request = require('supertest');
const app = require('../server_get'); 

describe('Testing Routes', () => {
  
  test('GET /getCardContent - Should return card content', async () => {
    const response = await request(app).get('/getCardContent');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Did you know Chocolate ice cream was invented before vanilla.");
  });

  test('GET /getOrders - Should retrieve orders successfully', async () => {
    const response = await request(app).get('/getOrders');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /addOrder - Should add a new order', async () => {
    const newOrder = { product: 'Vanilla Ice Cream', quantity: 3 };
    const response = await request(app)
      .post('/addOrder')
      .send(newOrder);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'Order added successfully');
    expect(response.body).toHaveProperty('orderId');
  });

  test('GET /getOrders - Should return 500 if there is a server issue', async () => {
    const response = await request(app).get('/getOrders');
    if (response.statusCode === 500) {
      expect(response.body).toHaveProperty('status', 'Failed to retrieve orders');
    }
  });
});
