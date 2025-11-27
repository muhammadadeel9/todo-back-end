import { Request, Response } from "express";
import { addTask, findsingleTask, getTasks, taskDelete, taskUpdate } from "./task.service";
import { taskmodel } from "./task.model";

export const readTasks = async (req: Request, res: Response) => {
  try {
    const data = await getTasks();
    return res.status(200).json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error("Error reading tasks:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to fetch tasks" 
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const result = await addTask(req.body);
    
    // Return the response from service
    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      data: result.result
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error while creating task" 
    });
  }
};
export const deleteTask=async(req:Request, res:Response)=>{
  const id = req.params.id;
  console.log(id);
  try {
    const result = await taskDelete(id);
    return res.status(result.status).json({
      success: result.success,
      message:result.message
    })
    
  } catch (error) {
    console.error("Error deleting task:" , error)
    return res.status(500).json({
      success:false,
      message:"Server error while deleting task"
    })
  }
  
}

export const singleTask=async(req:Request, res:Response)=>{
try {
  const id = req.params.id;
  const result = await findsingleTask(id);
  return res.status(result.status).json({
    success:result.success,
    message: result.message,
    data: result.task
  })
} catch (error) {
  console.error("Finding single task error", error)
  
}
}


export const updateTask = async(req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await taskUpdate(id,data);
    if(result){
      return res.status(result.status).json({
        success:result.success,
        message:result.message,
        data:result.result
      })
    }
  } catch (error) {
    console.error("here is the updating task error", error)
  }

}