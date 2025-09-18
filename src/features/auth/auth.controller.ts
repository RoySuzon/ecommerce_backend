import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import authService from "./auth.service";

class AuthController {
    // Register a new user
    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.error({ message: "Email and password are required", statusCode: 400 });
            }
            const user = await authService.userRegister(email, password);
            return res.success({ data: user, statusCode: 201 });
        } catch (error: any) {
            console.error("Register error:", error);
            return res.error({ message: error.message || "Internal server error", errors: error, statusCode: 400 });
        }
    }

    // Login and get JWT
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.error({ message: "Email and password are required", statusCode: 400 });
            }
            const { user, token } = await authService.login(email, password);
            return res.success({ data: { user, token }, statusCode: 200 });
        } catch (error: any) {
            console.error("Login error:", error);
            return res.error({ message: error.message, statusCode: 400 });
        }
    }

    // Logout user
    async logout(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.error({ message: "Token required", statusCode: 400 });
            }

            const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
            const result = await authService.logout(token);
            return res.success({ data: result, statusCode: 200 });
        } catch (error: any) {
            console.error("Logout error:", error);
            return res.error({ message: error.message, statusCode: 400 });
        }
    }

    // Get current user
    async me(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.error({ message: "Token required", statusCode: 401 });
            }

            const user = await authService.userRestrict(authHeader);
            return res.success({ data: user, statusCode: 200 });
        } catch (error: any) {
            console.error("Me error:", error);
            return res.error({ message: error.message, statusCode: 401 });
        }
    }
}

export default new AuthController();



export function getErrorMessage(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            // Get which field caused the issue
            const target = (error.meta?.target as string[]) || [];

            throw new Error(
                `A user with this ${target.join(", ")} already exists. Please use another one.`
            );
        }
    }
}