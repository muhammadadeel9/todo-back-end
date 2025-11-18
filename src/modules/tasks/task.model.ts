import mongoose from "mongoose";
import { taskSchema } from "../../schema/task.schema";



export const taskmodel = mongoose.model('tasks', taskSchema);