import { usersmodel } from "./users.model";
import jwt from "jsonwebtoken";
export const getUsers = () => usersmodel.find();

export const createUser = async (data: any) => {
  const { name, email, password } = data;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return {
      success: false,
      message: "All fields are required",
      statusCode: 400,
    };
  }

  const existing = await usersmodel.findOne({ email });
  if (existing) {
    return { success: false, message: "Email already exists", statusCode: 409 };
  }
    await usersmodel.create(data);
  const token =  jwt.sign(data, "adeel", { expiresIn: "5d" })
    return { success: true, message: "User created", statusCode: 201, token  };
};

export const signinUser = async (data: any) => {
  const { email, password } = data;
  const user = await usersmodel.findOne({ email });
  if (!user) {
    return { success: false, message: "User Not Found", statusCode: 404 };
  } else {
    const passwordmatch = user.password == password;
    if (!passwordmatch) {
      return { success: false, message: "Wrong password", statusCode: 401 };
    } else {
      return {
        success: true,
        message: "Sing in Successfully",
        statusCode: 200,
      };
    }
  }
};
