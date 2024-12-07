const express = require('express');
const http = require('http');  
const { Server } = require('socket.io'); 
// require('dotenv').config();
const app = express(); 
const server = http.createServer(app); 

// const admin = require('firebase-admin');

// const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
// const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
// const serviceAccount = JSON.parse(serviceAccountJson);


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// function sendPushNotification(token, message) {
//   const payload = {
//     notification: {
//       title: 'New Message',
//       body: message,
//       sound: 'default',
//     },
//   };

//   admin.messaging().sendToDevice(token, payload)
//     .then(response => {
//       console.log('Successfully sent message:', response);
//     })
//     .catch(error => {
//       console.error('Error sending message:', error);
//     });
// }
const io = new Server(server, {
    cors: {
      origin: '*', // Allowed origin
      methods: ['GET', 'POST'] // Allowed methods
      
    }, 
    transports: ['polling', 'websocket'],
  });
  
io.on('connection', (socket) => { 
  console.log('A user connected:', socket.id);

  // Join room based on user phone number
  socket.on('join', (phoneNumber) => {
      console.log(`${phoneNumber} joined room: ${phoneNumber}`);
      socket.join(phoneNumber);
  });

  // Handle incoming messages
  socket.on('message', (data) => {
      const { text, senderPhone, receiverPhone } = data;
      console.log(`Message from ${senderPhone} to ${receiverPhone}: ${text}`);

      // Emit the message to the receiver's room
      io.to(receiverPhone).emit('received', {
          data: { text, senderPhone, receiverPhone },
          message: 'This is a message from the server',
      });
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
  });
});


const port = 4000;
server.listen(port, () => {
    console.log(`Socket server listening on http://localhost:${port}`);
});
