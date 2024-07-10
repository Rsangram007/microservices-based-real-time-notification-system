const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sangram:sangram@sangram.44sfsmu.mongodb.net/notification-service', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use('/api', notificationRoutes);

module.exports = app;
