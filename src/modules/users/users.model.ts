import mongoose, { mongo } from "mongoose";

// export const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String },
//   // password: String
// });
export const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
export const usersmodel = mongoose.model('users', UserSchema);