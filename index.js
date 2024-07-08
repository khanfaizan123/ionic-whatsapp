const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server

const io = new Server(server, {
    cors: {
       origin: "*"
      }
});

io.on('connection', (socket) => {
    console.log('A user connected');

   

    socket.on('message', (data) => {
        console.log('Message received:', data);
      
        io.emit('received', { data: data, message: 'This is a text msg from server' },console.log(data));
    });
});

const port = 4000;
server.listen(port, () => {
    console.log(`Socket server listening on http://localhost:${port}`);
});
