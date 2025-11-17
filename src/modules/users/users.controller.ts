    import { Request, Response } from "express";
import { createUser, getUsers, signinUser } from "./users.service";

    export const getAllUsers = async (req: Request, res: Response) => {
    const users = await getUsers();
    return res.json({ success: true, users });
    };

    export const signup = async (req: Request, res: Response) => {
    try {
        const result = await createUser(req.body);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
    };
export const signin =async(req:Request,res: Response)=>{
try {
    const result = await signinUser(req.body);
    return res.status(result.statusCode).json(result);
} catch (error) {
    return res.status(500).json({message:"server Errro", success:false})
}
}