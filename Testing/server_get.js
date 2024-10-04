const express = require('express');
const app = express();
const orderRoutes = require('./routes/routes'); 

app.use(express.static('public'));
app.use(express.json());

app.get("/getCardContent", (req, res) => {
    res.send("Did you know Chocolate ice cream was invented before vanilla.");
});

app.use('/', orderRoutes);

if (process.env.NODE_ENV !== 'test') {
    const port = 3040;
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
}

module.exports = app;
