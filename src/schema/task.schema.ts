import mongoose, { Schema } from "mongoose";

export const taskSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String}
})