import { Router } from "express";
import { getAllUsers, signin, signup } from "./users.controller";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", signup);
userRoutes.post("/signin", signin);

export default userRoutes;
