import { usersmodel } from "./users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
  const hashedPassword = await bcrypt.hash(password, 10);
  await usersmodel.create({ name, email, password: hashedPassword });
  return { success: true, message: "User created", statusCode: 201 };
};

export const signinUser = async (data: any) => {
  const { email, password } = data;
  const user = await usersmodel.findOne({ email }) as any;
  if (!user) {
    return { success: false, message: "User Not Found", statusCode: 404 };
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Wrong password", statusCode: 401 };
    } else {
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
      },"adeel");
      return {
        success: true,
        message: "Sing in Successfully",
        statusCode: 200,
        token,
      };
    }
  }
};
