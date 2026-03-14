import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/all', getAllTasks);
router.get('/:id', getTaskById);
router.post('/create', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;

