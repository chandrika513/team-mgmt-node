import { tasks, generateId } from './taskStore';
import { Priority, Status } from '../models/taskModel';

beforeEach(() => {
  tasks.length = 0;
});

// tasks array tests
test('tasks starts empty', () => {
  expect(tasks).toEqual([]);
});

test('can add tasks to array', () => {
  const task = { id: '1', title: 'Test', priority: Priority.LOW, status: Status.PENDING };
  tasks.push(task);
  expect(tasks).toHaveLength(1);
  expect(tasks[0]).toEqual(task);
});

test('can remove tasks from array', () => {
  tasks.push({ id: '1', title: 'Test', priority: Priority.LOW, status: Status.PENDING });
  tasks.splice(0, 1);
  expect(tasks).toHaveLength(0);
});

// generateId tests
test('generateId returns a string', () => {
  const id = generateId();
  expect(typeof id).toBe('string');
});

test('generateId returns unique values', () => {
  const ids = new Set();
  for (let i = 0; i < 100; i++) {
    ids.add(generateId());
  }
  expect(ids.size).toBe(100);
});

test('generateId returns reasonable length', () => {
  const id = generateId();
  expect(id.length).toBeGreaterThanOrEqual(5);
  expect(id.length).toBeLessThanOrEqual(10);
});

test('generateId returns alphanumeric', () => {
  const id = generateId();
  expect(id).toMatch(/^[a-z0-9]+$/);
});
