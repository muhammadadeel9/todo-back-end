import mongoose, { model } from "mongoose";
import { UserSchema } from "../../schema/users.schema";



export const usersmodel = mongoose.model('users',UserSchema)
// export const createUsermodel = mongoose.model('users', CreateUserSchema);