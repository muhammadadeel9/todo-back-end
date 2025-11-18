import { Router } from "express";
import userRoutes from "../modules/users/users.route";
import taskRoutes from "../modules/tasks/tasks.route";

const router = Router();

// Use different base paths to avoid conflicts
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;