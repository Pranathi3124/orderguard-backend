# OrderGuard Backend

A robust backend system for OrderGuard, featuring a fully functional user authentication system and database integration.

## Features

- **User Authentication:** Secure signup and login using `bcryptjs` for password hashing and `jsonwebtoken` for secure sessions.
- **Frontend Dashboard:** A simple, interactive frontend built with HTML, CSS, and Vanilla JavaScript to interact with the backend APIs.
- **Database Integration:** 
  - **PostgreSQL (Cloud Database):** Stores and manages user credentials securely. The `users` table is automatically created upon starting the server.
  - **MongoDB:** Connected via Mongoose for handling complex order and inventory schemas.
- **Serverless Ready:** Configured to deploy out-of-the-box on platforms like **Vercel**.
- **RESTful API:** Well-structured routes for authentication (`/auth`), orders (`/order`), and inventory (`/inventory`).

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- A **PostgreSQL** connection string (e.g., Aiven, Neon, Render)
- A **MongoDB** connection string (e.g., MongoDB Atlas)

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
   Create a `.env` file in the root directory and add your cloud database URIs:
   ```env
   PORT=5000
   DATABASE_URL=postgres://user:password@host:port/defaultdb
   MONGO_URI=mongodb+srv://admin:pass@cluster...
   ```
   *(Note: The `users` table will automatically generate when the server connects successfully).*

4. **Start the Server:**
   Run the backend in development mode using nodemon:
   ```bash
   npm run dev
   ```

5. **View the Frontend:**
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```
   From here, you can test the **Sign Up** and **Login** flows.

## Vercel Deployment

1. Import your GitHub repository to Vercel.
2. In the Vercel project dashboard, go to **Settings > Environment Variables**.
3. Add the `DATABASE_URL` (PostgreSQL) and `MONGO_URI` (MongoDB).
4. Click **Deploy**. Vercel will use `vercel.json` to correctly start the Express API and serve your `public/` directory.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user and receive a JWT

*(Additional routes for `/order` and `/inventory` are structured within the project).*

## Technologies Used
- Node.js & Express.js
- PostgreSQL & `pg` 
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- `bcryptjs` for encryption
- `cors` and `dotenv`
