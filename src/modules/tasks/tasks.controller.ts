import { Request, Response } from "express";
import { addTask, getTasks } from "./task.service";

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