//socket server

import express from 'express';
import cors from 'cors'
import {createServer} from 'node:http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;

app.use(cors({
   origin: ['http://localhost:5173', 'http://localhost:3000'],
   credentials: false, 
}))

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        methods: ["GET", "POST"]
    } 
});

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);

    //emitting message
    socket.on('message', ({user, text}) => {
        io.emit("message", {user, text});
    });

    //disconnection
    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
    });
})

app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>")
})


server.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`);
});