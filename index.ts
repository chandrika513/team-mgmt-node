import express, { Request, Response, NextFunction} from "express";
import cors from "cors";
const app = express();
import taskRoutes from "./routes/taskRoutes";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json())

app.use('/tasks',taskRoutes)

// 404 handler for unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log("App running on", PORT);
})