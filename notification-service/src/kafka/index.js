const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  console.error(error);
});

exports.sendMessage = (topic, message) => {
  const payloads = [{ topic, messages: JSON.stringify(message) }];
  return new Promise((resolve, reject) => {
    producer.send(payloads, (error, data) => {
      if (error) {
        console.error('Error sending message to Kafka', error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};