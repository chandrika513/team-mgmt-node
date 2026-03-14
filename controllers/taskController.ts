import { Request, Response } from 'express';
import { Task, Priority, Status } from '../models/taskModel';
import { tasks, generateId } from '../data/taskStore';

export const getAllTasks = (req: Request, res: Response): void => {
  res.json({ tasks });
};

export const getTaskById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json({ task });
};

export const createTask = (req: Request, res: Response): void => {
  const { title, description, priority, status } = req.body;

  if (!title || !priority || !status) {
    res.status(400).json({ message: 'Title, priority, and status are required' });
    return;
  }

  if (!Object.values(Priority).includes(priority)) {
    res.status(400).json({ message: 'Priority must be one of: low, medium, high' });
    return;
  }

  if (!Object.values(Status).includes(status)) {
    res.status(400).json({ message: 'Status must be one of: pending, in_progress, done' });
    return;
  }

  const newTask: Task = {
    id: generateId(),
    title,
    description,
    priority,
    status,
  };

  tasks.push(newTask);
  res.status(201).json({ task: newTask });
};

export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (priority && !Object.values(Priority).includes(priority)) {
    res.status(400).json({ message: 'Priority must be one of: low, medium, high' });
    return;
  }

  if (status && !Object.values(Status).includes(status)) {
    res.status(400).json({ message: 'Status must be one of: pending, in_progress, done' });
    return;
  }

  const updatedTask: Task = { ...tasks[taskIndex] };

  if (title) {
    updatedTask.title = title;
  }

  if (description !== undefined) {
    updatedTask.description = description;
  }

  if (priority) {
    updatedTask.priority = priority;
  }

  if (status) {
    updatedTask.status = status;
  }

  tasks[taskIndex] = updatedTask;
  res.json({ task: updatedTask });
};

export const deleteTask = (req: Request, res: Response): void => {
   const token = req.headers["x-delete-token"];

  if (token !== "task-manager-secret") {
    res.status(403).json({ message: "Unauthorized delete request" });
    return ;
  }
  
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: 'Task deleted', task: deletedTask });
};
