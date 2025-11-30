import { Router } from "express";
import { createTask, deleteTask, readTasks, singleTask, updateTask } from "./tasks.controller";

const taskRoutes = Router();

taskRoutes.post('/create', createTask);
taskRoutes.get('/', readTasks);
taskRoutes.get('/task/:id',singleTask)
taskRoutes.put('/update/:id', updateTask);
taskRoutes.delete('/delete/:id', deleteTask);

export default taskRoutes;