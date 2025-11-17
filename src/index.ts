import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import { usersmodel } from "./models/users.model";

const app = express();
const PORT = process.env.PORT || 3200;
// Middleware
DbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req: Request, res: Response) => {
  const users = await usersmodel.find();
  console.log(users);
  res.json({ message: "All users ", success: true, users: users });
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "All Fields are Requiered",
        success: false,
      });
    }
    const existEmail = await usersmodel.findOne({ email });
    if (existEmail) {
      res.status(409).json({
        message: "Email already Exist ",
        success: false,
      });
    }
    console.log(existEmail);

    // if (!name) {
    //   res.send({
    //     message: "UserName is Requiered",
    //     success: false,
    //   });
    // } else if (!email) {
    //   res.send({
    //     message: "Email is Requiered",
    //     success: false,
    //   });
    // } else if (!password) {
    //   res.send({
    //     message: "Password is Requiered",
    //     success: false,
    //   });
    // } else {
    //   await usersmodel.create(req.body);
    //   res.send({
    //     message: "User Added successfully",
    //     success: true,
    //   });
    // }
    await usersmodel.create(req.body);
    res.status(201).json({
      message: "User Added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
