import { Request, Response } from 'express';
import { Priority, Status } from '../models/taskModel';
import { tasks, generateId } from '../data/taskStore';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from './taskController';

// Clear tasks before each test
beforeEach(() => {
  tasks.length = 0;
});

// Simple mock helpers
function mockReq(data: any): Partial<Request> {
  return data as Partial<Request>;
}

function mockRes(): any {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

// getAllTasks tests
test('getAllTasks returns empty array when no tasks', () => {
  const res = mockRes();
  getAllTasks(mockReq({}) as Request, res as Response);
  expect(res.json).toHaveBeenCalledWith({ tasks: [] });
});

test('getAllTasks returns all tasks', () => {
  tasks.push({ id: '1', title: 'Task 1', priority: Priority.LOW, status: Status.PENDING });
  const res = mockRes();
  getAllTasks(mockReq({}) as Request, res as Response);
  expect(res.json).toHaveBeenCalledWith({ tasks });
});

// getTaskById tests
test('getTaskById returns task when found', () => {
  const task = { id: 'abc', title: 'Test', priority: Priority.MEDIUM, status: Status.IN_PROGRESS };
  tasks.push(task);
  const res = mockRes();
  getTaskById(mockReq({ params: { id: 'abc' } }) as Request, res as Response);
  expect(res.json).toHaveBeenCalledWith({ task });
});

test('getTaskById returns 404 when not found', () => {
  const res = mockRes();
  getTaskById(mockReq({ params: { id: 'xyz' } }) as Request, res as Response);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
});

// createTask tests
test('createTask creates task with valid data', () => {
  const res = mockRes();
  createTask(
    mockReq({ body: { title: 'New Task', priority: Priority.HIGH, status: Status.PENDING } }) as Request,
    res as Response
  );
  expect(res.status).toHaveBeenCalledWith(201);
  expect(tasks).toHaveLength(1);
  expect(tasks[0].title).toBe('New Task');
});

test('createTask requires title, priority, and status', () => {
  const res = mockRes();
  createTask(mockReq({ body: { priority: Priority.LOW } }) as Request, res as Response);
  expect(res.status).toHaveBeenCalledWith(400);
});

test('createTask rejects invalid priority', () => {
  const res = mockRes();
  createTask(
    mockReq({ body: { title: 'Test', priority: 'bad', status: Status.PENDING } }) as Request,
    res as Response
  );
  expect(res.status).toHaveBeenCalledWith(400);
});

test('createTask rejects invalid status', () => {
  const res = mockRes();
  createTask(
    mockReq({ body: { title: 'Test', priority: Priority.LOW, status: 'bad' } }) as Request,
    res as Response
  );
  expect(res.status).toHaveBeenCalledWith(400);
});

// updateTask tests
test('updateTask updates task fields', () => {
  tasks.push({ id: '1', title: 'Old', priority: Priority.LOW, status: Status.PENDING });
  const res = mockRes();
  updateTask(mockReq({ params: { id: '1' }, body: { title: 'New' } }) as Request, res as Response);
  expect(tasks[0].title).toBe('New');
});

test('updateTask returns 404 for non-existent task', () => {
  const res = mockRes();
  updateTask(mockReq({ params: { id: '999' }, body: { title: 'Test' } }) as Request, res as Response);
  expect(res.status).toHaveBeenCalledWith(404);
});

test('updateTask rejects invalid priority', () => {
  tasks.push({ id: '1', title: 'Test', priority: Priority.LOW, status: Status.PENDING });
  const res = mockRes();
  updateTask(mockReq({ params: { id: '1' }, body: { priority: 'bad' } }) as Request, res as Response);
  expect(res.status).toHaveBeenCalledWith(400);
});

// deleteTask tests
test('deleteTask deletes task with valid token', () => {
  tasks.push({ id: '1', title: 'Delete Me', priority: Priority.MEDIUM, status: Status.PENDING });
  const res = mockRes();
  deleteTask(
    mockReq({ params: { id: '1' }, headers: { 'x-delete-token': 'task-manager-secret' } }) as Request,
    res as Response
  );
  expect(tasks).toHaveLength(0);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Task deleted' }));
});

test('deleteTask rejects without token', () => {
  tasks.push({ id: '1', title: 'Keep Me', priority: Priority.MEDIUM, status: Status.PENDING });
  const res = mockRes();
  deleteTask(mockReq({ params: { id: '1' }, headers: {} }) as Request, res as Response);
  expect(res.status).toHaveBeenCalledWith(403);
  expect(tasks).toHaveLength(1);
});

test('deleteTask returns 404 for non-existent task', () => {
  const res = mockRes();
  deleteTask(
    mockReq({ params: { id: '999' }, headers: { 'x-delete-token': 'task-manager-secret' } }) as Request,
    res as Response
  );
  expect(res.status).toHaveBeenCalledWith(404);
});
