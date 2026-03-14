# Team Management Hub

Simple task management app with Node/Express backend and React frontend.

## Features

- Create, read, update, delete tasks
- Tasks have: title, description, priority (low/medium/high), status (pending/in_progress/done)
- Delete requires auth header (X-Delete-Token: task-manager-secret)

## Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- Jest for testing

**Frontend:**
- React + TypeScript
- Context API for state
- Tailwind CSS

## Quick Start

```bash
# Backend
cd backend
npm install
npm test        # run tests
npm run dev     # start server on :8000

# Frontend
cd frontend
npm install
npm run dev     # start on :5173
```

## API

- `GET /tasks/all` - list all tasks
- `GET /tasks/:id` - get one task
- `POST /tasks/create` - create task (needs title, priority, status)
- `PUT /tasks/:id` - update task
- `DELETE /tasks/:id` - delete task (needs X-Delete-Token header)

## Notes

- In-memory storage (resets on restart)
- CORS configured for localhost:3000
- Tests are basic but cover main functionality
