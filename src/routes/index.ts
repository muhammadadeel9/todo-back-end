import { Router } from "express";
import userRoutes from "../modules/users/users.route";


const router = Router();

router.use("/", userRoutes);

export default router;
