const WebSocket = require("ws");

const wsUrl = "ws://localhost:8080";
const userId = "668e33a7a641b66c9a76d7ad"; // Replace with your user ID

const ws = new WebSocket(wsUrl);

ws.on("open", () => {
  // Register with the WebSocket server
  const registrationMessage = JSON.stringify({ type: "register", userId });
  ws.send(registrationMessage);
  console.log(`WebSocket client connected with user ID ${userId}`);
});

ws.on("message", (message) => {
  console.log(`Received notification from server: ${message}`);
});

ws.on("close", () => {
  console.log("WebSocket Connection Closed");
});

ws.on("error", (err) => {
  console.error("WebSocket Error:", err);
});
