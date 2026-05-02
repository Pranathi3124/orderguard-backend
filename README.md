# OrderGuard Backend

A robust backend system for OrderGuard, featuring a fully functional user authentication system and database integration.

## Features

- **User Authentication:** Secure signup and login using `bcryptjs` for password hashing and `jsonwebtoken` for secure sessions.
- **Frontend Dashboard:** A simple, interactive frontend built with HTML, CSS, and Vanilla JavaScript to interact with the backend APIs.
- **Database Integration:** 
  - **MySQL:** Stores and manages user credentials securely. The `users` table is automatically created upon starting the server.
  - **MongoDB:** Connected via Mongoose for handling complex order and inventory schemas.
- **RESTful API:** Well-structured routes for authentication (`/auth`), orders (`/order`), and inventory (`/inventory`).

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) server running locally or remotely
- [MongoDB](https://www.mongodb.com/) running locally (port 27017) or a MongoDB Atlas URI

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pranathi3124/orderguard-backend.git
   cd orderguard-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your MySQL database credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=orderguard
   ```

4. **Set Up the Database:**
   Ensure your MySQL server is running and create the `orderguard` database:
   ```sql
   CREATE DATABASE orderguard;
   ```
   *Note: The `users` table will be automatically created when the server starts.*

5. **Start the Server:**
   Run the backend in development mode using nodemon:
   ```bash
   npm run dev
   ```

6. **View the Frontend:**
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```
   From here, you can test the **Sign Up** and **Login** flows.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user and receive a JWT

*(Additional routes for `/order` and `/inventory` are structured within the project).*

## Technologies Used
- Node.js & Express.js
- MySQL & `mysql2`
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- `bcryptjs` for encryption
- `cors` and `dotenv`
