# Real-Time Notification System

## Overview
This project implements a microservices-based real-time notification system using Node.js, MongoDB, Kafka, WebSocket, and JWT authentication. The system allows users to receive real-time notifications and manage their notification statuses.

## Technologies Used
- Node.js
- Express
- MongoDB (with Mongoose ORM)
- Kafka  
- WebSocket (or Socket.IO)
- JWT (JSON Web Tokens)
 

## Project Structure
The project directory structure is organized as follows:

project-root/
│
├── auth-service/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── notification-service/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── notificationController.js
│   │   ├── models/
│   │   │   └── Notification.js
│   │   ├── routes/
│   │   │   └── notificationRoutes.js
│   │   ├── kafka/
│   │   │   ├── index.js
│   │   │   └── kafkaConsumer.js
│   │   ├── websocket/
│   │   │   └── websocketServer.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── client/
│   └── websocketClient.js  <-- Place websocketClient.js here
│
├── docker-compose.yml
└── README.md




## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rsangram007/microservices-based-real-time-notification-system.git
   cd project-directory


## Install dependencies:

npm install


# Start the auth-service
cd auth-service
npm start

# Start the notification-service
cd notification-service
npm start

# Start the Client
cd websocket-server
npm start


# OR Use Docker 
docker-compose up --build


## Usage
## Use the provided endpoints to:

Register a new user
Login and obtain a JWT
Create notifications
Retrieve notifications
Mark notifications as read
Connect to WebSocket for real-time notifications

