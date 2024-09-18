const express = require("express");
const app = express();

app.use(express.static('public'));

app.get("/getCardContent", (req, res) => {
    res.send("Did you know Chocolate ice cream was invented before vanilla.");
});

app.get("/addTwoNumbers", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumbers(n1, n2);
    res.json({ statusCode: 200, data: result });
});

const port = 3040;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
