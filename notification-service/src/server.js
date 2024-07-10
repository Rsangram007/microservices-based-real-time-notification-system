const app = require('./app');
const port = 4000;
require('./kafka/kafkaConsumer'); // Start the Kafka consumer
require('./websocket/websocketServer'); // Start the WebSocket server

app.listen(port, () => {
  console.log(`Notification Service running on port ${port}`);
});
