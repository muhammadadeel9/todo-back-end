import { Router } from "express";
import {
  createTask,
  deleteTask,
  readTasks,
  singleTask,
  updateTask,
} from "./tasks.controller";

const taskRoutes = Router();

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
taskRoutes.post("/create", createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
taskRoutes.get("/", readTasks);

/**
 * @swagger
 * /api/tasks/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
taskRoutes.get("/task/:id", singleTask);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
taskRoutes.put("/update/:id", updateTask);

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
taskRoutes.delete("/delete/:id", deleteTask);

export default taskRoutes;




// import { Router } from "express";
// import { createTask, deleteTask, readTasks, singleTask, updateTask } from "./tasks.controller";

// const taskRoutes = Router();

// taskRoutes.post('/create', createTask);
// taskRoutes.get('/', readTasks);
// taskRoutes.get('/task/:id',singleTask)
// taskRoutes.put('/update/:id', updateTask);
// taskRoutes.delete('/delete/:id', deleteTask);

// export default taskRoutes;