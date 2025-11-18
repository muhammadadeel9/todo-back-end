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
        result: null
      };
    }

    // Create task - await the promise
    const result = await taskmodel.create({ title, description });
    
    return {
      success: true,
      message: "Task added successfully",
      status: 201,
      result: result
    };
  } catch (error) {
    console.error("Error in addTask service:", error);
    throw error;
  }
};