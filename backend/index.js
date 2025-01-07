const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}));

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("beginPath", (path) => {
        socket.broadcast.emit("beginPath", path);
    });

    socket.on("drawLine", (path) => {
        socket.broadcast.emit("drawLine", path);
    });

    socket.on("changeConfig", (arg) => {
        socket.broadcast.emit("changeConfig", arg);
    });
});

httpServer.listen(5000);