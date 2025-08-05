# Personal Notes Fullstack App

This is a full-stack personal notes web application built with the following technologies:

- **Frontend:** React (with Vite) and Tailwind CSS
- **Backend:** Node.js, Express, and PostgreSQL

## Project Structure

- `client/`: Contains the React frontend application.
- `server/`: Contains the Node.js/Express backend server and API.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup and Running the Application

### 1. Backend Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    - Make sure you have PostgreSQL installed and running.
    - Create a new database. You can use the `psql` command-line tool or a GUI like pgAdmin.
      ```sql
      CREATE DATABASE notes_app;
      ```
    - Connect to your new database and run the SQL script to create the `notes` table.
      ```bash
      psql -U your_postgres_user -d notes_app -f database.sql
      ```

4.  **Configure environment variables:**
    - Rename the `.env.example` file to `.env`.
    - Open the `.env` file and update the following values with your PostgreSQL credentials:
      ```
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_HOST=localhost
      DB_PORT=5432
      DB_DATABASE=notes_app
      ```

5.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

### 2. Frontend Setup

1.  **Navigate to the client directory in a new terminal:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The React app will open in your browser at `http://localhost:5173` (or another port if 5173 is busy).

The frontend is configured to proxy API requests to the backend server, so you should be able to see your notes, add new ones, and delete them.
