const Notification = require('../models/Notification');
const kafka = require('../kafka');

exports.createNotification = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    
    const kafkaResponse = await kafka.sendMessage('notification', { userId, message });
    console.log("Kafka response", JSON.stringify(kafkaResponse, null, 2));

    // Extract partition and offset details
    Object.entries(kafkaResponse).forEach(([topic, partitions]) => {
      Object.entries(partitions).forEach(([partition, offset]) => {
        console.log(`Message written to topic "${topic}" in partition ${partition} at offset ${offset}`);
      });
    });
    
    res.status(201).send(notification);
  } catch (error) {
    console.error('Error creating notification', error);
    res.status(400).send({ error: 'Error creating notification' });
  }
};
exports.getNotifications = async (req, res) => {
  const { userId } = req.user;
  try {
    const notifications = await Notification.find({ userId });
    res.send(notifications);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching notifications' });
  }
};

exports.getNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).send({ error: 'Notification not found' });
    }
    res.send(notification);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching notification' });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).send({ error: 'Notification not found' });
    }
    notification.read = true;
    await notification.save();
    res.send(notification);
  } catch (error) {
    res.status(400).send({ error: 'Error updating notification' });
  }
};
