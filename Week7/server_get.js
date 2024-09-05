const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submitInfo", (req, res) => {
    const { name, email } = req.body;
    console.log(`Received submission: Name: ${name}, Email: ${email}`);
    res.json({ message: "Thank you for submitting your information!" });
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (data) => {
        console.log('Received message from client:', data);
        socket.emit('message', `Server received your message: ${data}`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = 3040;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
