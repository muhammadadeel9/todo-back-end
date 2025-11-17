import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isconnected = false;
async function DbConnection() {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("Database Url is not available");
    }
    if (isconnected) {
      console.log("Using Existing database connection ");
    return
    }
    const db = await mongoose.connect(process.env.DATABASE_URI);
    isconnected =true;
    console.log("Database connected successfully");
    return db
  } catch (error) {
    console.log("Database Error " , error);
    throw error
  }
}
export default DbConnection;
