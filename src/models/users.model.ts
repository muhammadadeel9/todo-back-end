import mongoose, { model } from "mongoose";
import { CreateUserSchema } from "../schema/users.schema";



export const usersmodel = mongoose.model('users',CreateUserSchema)
// export const createUsermodel = mongoose.model('users', CreateUserSchema);