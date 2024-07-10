const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/notifications', authMiddleware, notificationController.createNotification);
router.get('/notifications', authMiddleware, notificationController.getNotifications);
router.get('/notifications/:id', authMiddleware, notificationController.getNotification);
router.put('/notifications/:id', authMiddleware, notificationController.markAsRead);

module.exports = router;
