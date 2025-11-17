import { Router } from "express";
import userRoutes from "../modules/users/users.route";


const router = Router();

router.use("/users", userRoutes);

export default router;
