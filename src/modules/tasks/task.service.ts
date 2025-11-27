import { isValidObjectId } from "mongoose";
import { taskmodel } from "./task.model";

export const getTasks = async () => {
  try {
    return await taskmodel.find();
  } catch (error) {
    console.error("Error in getTasks service:", error);
    throw error;
  }
};

export const addTask = async (data: any) => {
  try {
    const { title, description } = data;

    // Validate required fields
    if (!title || !description) {
      return {
        success: false,
        message: "Title and description are required",
        status: 400,
        result: null,
      };
    }
    const result = await taskmodel.create({ title, description });

    return {
      success: true,
      message: "Task added successfully",
      status: 201,
      result: result,
    };
  } catch (error) {
    console.error("Error in addTask service:", error);
    throw error;
  }
};

export const taskDelete = async (id: String) => {
  try {
    console.log(id);
    const result = await taskmodel.findOneAndDelete({ _id: id });
    console.log(result);
    if (!result) {
      throw new Error("task not found");
    } else {
      return {
        success: true,
        message: "Task Deleted successfully",
        status: 200,
        result: result,
      };
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
export const findsingleTask=async(id:any)=>{
try {
  if(!isValidObjectId(id)){
    return { 
      success: false, 
      message: "Invalid task ID format", 
      status: 400 
    };
  }
  const task = await taskmodel.findById(id);
  if (!task) {
    return { success: false, message: "Task not found ", status: 404 };
  } else {
    return {
      success: true,
      message: "single task successfully fetched",
      status: 200,
      task,
    }};
} catch (error) {
  console.error("Error finding task",error);
  throw error
}
}

export const taskUpdate = async (id: String, data: any) => {
  try {
    if(!isValidObjectId(id)){
      return { 
        success: false, 
        message: "Invalid task ID format", 
        status: 400 
      };
    }
    const result = await taskmodel.findByIdAndUpdate(id, data,{new:true});
    console.log(result);
    if (!result) {
      return { success: false, message: "Task not found ", status: 404 };
    } else {
      return {
        success: true,
        message: "Task updated successfully",
        status: 200,
        result,
      };
    }
  } catch (error) {
    console.error("Error finding task", error);
    throw error;
  }
};
