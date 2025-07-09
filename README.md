# TaskFlow Backend API

TaskFlow is a collaborative project management backend API built with Node.js, Express, and MySQL. It supports multi-team project management, task tracking, real-time notifications, file sharing, and comprehensive analytics.

---

## Features

- User authentication & role-based access control  
- Project & team management with hierarchies and roles  
- Task management with assignments, dependencies, and custom workflows  
- Collaboration via comments, file uploads, and activity feeds  
- Real-time notifications using WebSocket (Socket.IO)  
- Analytics and reporting for task statuses, progress, workloads, and trends  
- API documentation via Swagger (OpenAPI)  

---

## Tech Stack

- Node.js with Express.js  
- MySQL with Sequelize ORM  
- WebSocket real-time communication with Socket.IO  
- JWT for authentication  
- Swagger for API documentation  

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)  
- MySQL server  
- npm or yarn  

### Setup Instructions

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd taskflow-api
2.Install dependencies

npm install

3.Setup environment variables

Create a .env file in the root folder with:

env
Copy
PORT=5000
JWT_SECRET=your_jwt_secret
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_HOST=localhost
Setup the database

4.Create a MySQL database using your preferred client:

CREATE DATABASE your_database_name;
Run Sequelize migrations (if implemented) or sync models

5.Start the server

npm start
Access API docs

6.Open your browser at http://localhost:5000/api-docs

*API Endpoints*
Key endpoints include:

Auth: /api/auth (register, login)

Projects: /api/projects

Tasks: /api/tasks

Teams: /api/teams

Comments: /api/comments

Files: /api/files

Activities: /api/activities

Notifications: /api/notifications

Analytics: /api/analytics

Refer to Swagger docs for full details and request/response formats.

Running Tests
Tests use Jest and Supertest:

npm test
Real-time Notifications
This backend supports real-time updates via WebSocket (Socket.IO).
Clients should connect to the Socket.IO server and register with their user ID to receive notifications.

Contribution
Feel free to fork the repo and create pull requests for improvements or bug fixes.

License
MIT License

Contact
For any questions or support, reach out to:

Yashwardhan Nigam
Email: work.yashwardhan@gmail.com
GitHub: https://github.com/yashwardhan174


