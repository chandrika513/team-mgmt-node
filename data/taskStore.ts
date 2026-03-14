import { Task } from '../models/taskModel';

export const tasks: Task[] = [];

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
