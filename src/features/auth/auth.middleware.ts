import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing or malformed" });
        }

        const token = authHeader.split(" ")[1];
        const user = await authService.userRestrict(token);

        req.user = user;
        next();
    } catch (error: any) {
        // Specific messages from service are already descriptive
        return res.status(401).json({ message: error.message });
    }
}
