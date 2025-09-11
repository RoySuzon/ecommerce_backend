import { Request, Response } from "express";
import userService from "../services/userService";




class UserController {
    async getUsers(req: Request, res: Response) {
        // const name = typeof req.query.name === "string" ? req.query.name : "";

        const { email = '' } = req.query;
        try {
            const users = await userService.fetchUser(String(email));
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error })
        }
    };

    async createUser(req: Request, res: Response) {
        const { name, email, address, phone } = req.body;
        try {
            const user = await userService.insertUser(name, email, address, phone);
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: "Email must be unique" });
        }
    }
}


export default new UserController