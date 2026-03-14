# Team Management Hub

A full-stack task management application built with Node.js, Express, TypeScript (backend) and React, TypeScript, Context API (frontend).

## Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, Description, Priority (Low/Medium/High), Status (Pending/In Progress/Done)
- **Search & Filter**: Search by title, filter by priority and status
- **Protected Delete**: Delete operations require authentication header
- **Data Validation**: Zod validation on both client and server
- **Responsive UI**: Clean, modern interface with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- CORS enabled for frontend communication

### Frontend
- React 18
- TypeScript
- Context API for state management
- Zod for form validation
- Lucide React for icons
- Axios for API calls
- Tailwind CSS for styling

## Project Structure

```
TeamMngmentHubNode/
├── backend/
│   ├── controllers/
│   │   └── taskController.ts
│   ├── models/
│   │   └── taskModel.ts
│   ├── data/
│   │   └── taskStore.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── index.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.ts
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── context/
│   │   │   └── TaskContext.tsx
│   │   ├── types/
│   │   │   └── task.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks/all` | Get all tasks | No |
| GET | `/tasks/:id` | Get task by ID | No |
| POST | `/tasks/create` | Create new task | No |
| PUT | `/tasks/:id` | Update task | No |
| DELETE | `/tasks/:id` | Delete task | Yes (X-Auth-Token header) |

### Protected Delete Header

To delete a task, include the following header:
```
X-Auth-Token: delete-auth-token
```

## Data Models

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority; // 'low' | 'medium' | 'high'
  status: Status;     // 'pending' | 'in_progress' | 'done'
}
```

## Validation Rules

- **Title**: Required, max 200 characters
- **Description**: Optional, max 1000 characters
- **Priority**: Must be one of: low, medium, high
- **Status**: Must be one of: pending, in_progress, done

## Development Notes

- Backend uses in-memory storage (tasks array)
- CORS is configured to allow requests from `http://localhost:3000`
- Global error handling middleware catches unhandled errors
- 404 handler for unknown routes

## License

MIT
