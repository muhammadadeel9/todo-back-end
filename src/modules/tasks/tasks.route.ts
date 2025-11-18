import { Router } from "express";
import { createTask, readTasks } from "./tasks.controller";

const taskRoutes = Router();

// Routes will be /api/v1/tasks/create (if main route uses /api/v1)
taskRoutes.post('/create', createTask);
taskRoutes.get('/', readTasks);
// taskRoutes.put('/:id', updateTask);
// taskRoutes.delete('/:id', deleteTask);

export default taskRoutes;