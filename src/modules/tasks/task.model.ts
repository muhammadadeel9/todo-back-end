import mongoose, { Schema } from "mongoose";

export const taskSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    completed:{type:Boolean, default:false},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
},{timestamps:true})

export const taskmodel = mongoose.model('tasks', taskSchema);