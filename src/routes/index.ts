import { Router } from "express";
import userRoutes from "../modules/users/users.route";


const router = Router();

router.use("/api", userRoutes);

export default router;
