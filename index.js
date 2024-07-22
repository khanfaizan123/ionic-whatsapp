const express = require('express');
const http = require('http');  
const { Server } = require('socket.io'); 
const app = express(); 
const server = http.createServer(app); // Create an HTTP server


const admin = require('firebase-admin');

const serviceAccount = require('./src/assets/serviceAccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendPushNotification(token, message) {
  const payload = {
    notification: {
      title: 'New Message',
      body: message,
      sound: 'default',
    },
  };

  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}
const io = new Server(server, {
    cors: {
       origin: "*"
      }
});
io.on('connection', (socket) => {
    console.log('A user connected'); 
    socket.on('message', (data) => {
 
        io.emit('received', { data: data, message: 'This is a text msg from server' });
        const recipientToken = data.token; // Define how to get the recipient \token
        console.log(recipientToken,"token h");
        sendPushNotification(recipientToken, data.text);
    });
});


const port = 4000;
server.listen(port, () => {
    console.log(`Socket server listening on http://localhost:${port}`);
});
