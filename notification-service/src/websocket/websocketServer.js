// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// const clients = new Map();

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     const parsedMessage = JSON.parse(message);
//     if (parsedMessage.type === 'register') {
//       clients.set(parsedMessage.userId, ws);
//     }
//   });

//   ws.on('close', () => {
//     for (let [userId, client] of clients.entries()) {
//       if (client === ws) {
//         clients.delete(userId);
//       }
//     }
//   });
// });

// const broadcastNotification = (userId, notification) => {
//   const client = clients.get(userId);
//   if (client) {
//     const messageToSend = JSON.stringify(notification);
//     client.send(messageToSend);
//     console.log(`Sent notification to user ${userId}:`, messageToSend);
//   } else {
//     console.log(`User ${userId} is not connected.`);
//   }
// };

// module.exports = broadcastNotification;

// websocketServer.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

// Function to broadcast notification to connected clients
const broadcastNotification = (userId, notification) => {
  const client = clients.get(userId);
  if (client) {
    const messageToSend = JSON.stringify(notification);
    client.send(messageToSend);
    console.log(`Sent notification to user ${userId}:`, messageToSend);
  } else {
    console.log(`User ${userId} is not connected.`);
  }
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'register') {
      clients.set(parsedMessage.userId, ws);
      console.log(`User ${parsedMessage.userId} connected.`);
    }
  });

  ws.on('close', () => {
    for (let [userId, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(userId);
        console.log(`User ${userId} disconnected.`);
      }
    }
  });
});

module.exports = broadcastNotification;
