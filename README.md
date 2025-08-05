# Notes App

simple fullstack personal notes app to create, pin, search, and manage  thoughts — built with React, Tailwind, Express, and PostgreSQL.

---

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL

---

## Project Structure

    notesapp/
    ├── client/      # React frontend
    ├── server/      # Express backend + PostgreSQL
    └── README.md

---

## Features

- CRUD notes  
- Pinning notes show pinned ones at the top  
- Search notes 
- fully responsive and styled with Tailwind  
- dark mode 
- User authentication + private notes

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)  
- [npm](https://www.npmjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)

---

## Backend Setup

1. Open terminal and navigate to backend folder:

        cd server

2. Install dependencies:

        npm install

3. Create the database:

        CREATE DATABASE notes_app;

4. Run the schema (this creates the `notes` table):

        psql -U your_postgres_user -d notes_app -f database.sql

5. Copy the environment config and fill in your credentials:

        cp .env.example .env

   Update `.env` with your PostgreSQL settings:

        DB_USER=your_user
        DB_PASSWORD=your_password
        DB_HOST=localhost
        DB_PORT=5432
        DB_DATABASE=notes_app

6. Start the backend server:

        npm run dev

   It should run at `http://localhost:5000`

---

## Frontend Setup

1. In a separate terminal tab go to the frontend folder

        cd client

2. Install dependencies:

        npm install

3. Start the development server:

        npm run dev

   The app should be available at `http://localhost:5173`

> The frontend is configured to proxy API requests to the backend, so everything should just work out of the box

---

## API Overview

| Method | Route             | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/notes`      | Fetch all notes    |
| POST   | `/api/notes`      | Create a new note  |
| PUT    | `/api/notes/:id`  | Update a note      |
| DELETE | `/api/notes/:id`  | Delete a note      |

---

## Roadmap

- [x] Create / delete notes  
- [x] Pin + sort notes  
- [x] Search bar  
- [ ] Edit functionality  
- [ ] User login + private notes  
- [ ] Mobile UX polish  
- [ ] Deploy to Vercel + Render

---

## License

MIT

---

## Contributing

pluh
