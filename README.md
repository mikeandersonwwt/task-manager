# Task Manager Application

A simple task manager built with Node.js/Express backend and React frontend.

## Features

- Create tasks with title and description
- Mark tasks as complete/incomplete
- Edit existing tasks
- Delete tasks
- Persistent storage using JSON file

## Project Structure

```
task-manager/
├── backend/                 # Express API server
│   ├── server.js           # Main server file
│   ├── routes/
│   │   └── tasks.js        # Task CRUD endpoints
│   ├── middleware/
│   │   └── errorHandler.js # Error handling middleware
│   └── data/
│       └── tasks.json      # Task storage
└── frontend/               # React application
    ├── public/
    │   └── index.html      # HTML template
    └── src/
        ├── App.js          # Main component
        ├── components/     # React components
        └── services/
            └── api.js      # API service layer
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation & Running

1. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**

   Open a NEW terminal window and run:
   ```bash
   cd frontend
   npm install
   ```

3. **Start the Backend Server**

   In the backend terminal:
   ```bash
   npm start
   ```
   
   The backend will run on http://localhost:5000

4. **Start the Frontend Application**

   In the frontend terminal:
   ```bash
   npm start
   ```
   
   The frontend will run on http://localhost:3000 and open in your browser

## API Endpoints

All endpoints are relative to `http://localhost:5000`.

**Task object shape returned by all endpoints:**
```json
{
  "id": "unique-id",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

**`GET /api/tasks`** — Get all tasks
```bash
curl http://localhost:5000/api/tasks
```
Returns an array of task objects.

---

**`GET /api/tasks/:id`** — Get a single task
```bash
curl http://localhost:5000/api/tasks/<id>
```

---

**`POST /api/tasks`** — Create a new task

Required body fields: `title`. Optional: `description`.
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```
Returns the created task object with a generated `id` and `createdAt`.

---

**`PUT /api/tasks/:id`** — Update a task

Accepts any combination of `title`, `description`, or `completed`.
```bash
curl -X PUT http://localhost:5000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```
Returns the updated task object.

---

**`DELETE /api/tasks/:id`** — Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/<id>
```
Returns a `204 No Content` response on success.

## Technologies Used

### Backend
- Express.js - Web framework
- CORS - Cross-origin resource sharing
- Node.js File System - JSON file storage

### Frontend
- React - UI library
- React Hooks - State management
- Fetch API - HTTP requests
- CSS - Styling

## Application Screenshots

![Task Manager Screenshot 1](TM_completed.png)

![Task Manager Screenshot 2](TM_completed2.png)

## Acknowledgments

This is an independent educational and portfolio project. This repository was built by me with assistance from AI coding tools for planning, implementation support, and documentation refinement.
