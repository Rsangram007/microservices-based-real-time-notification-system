const kafka = require('kafka-node');
const broadcastNotification = require('../websocket/websocketServer');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'notification', partition: 0 }],
  { autoCommit: true }
);

// Log when the Kafka consumer is ready
consumer.on('ready', () => {
  console.log('Kafka consumer is connected and ready.');
});

consumer.on('message', (message) => {
  const notification = JSON.parse(message.value);
  console.log("Received message from Kafka consumer:", notification);
  broadcastNotification(notification.userId, notification);
});

consumer.on('error', (err) => {
  console.error('Kafka consumer error:', err);
});
