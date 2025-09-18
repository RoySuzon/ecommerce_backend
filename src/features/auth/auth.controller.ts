import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
    async userRegister(req: Request, res: Response) {
        //  #swagger.tags = ['Auth']
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return res.error({ message: "Email and password are required", statusCode: 400 });
            }
            if (!email.includes("@")) {
                return res.error({ message: "Invalid email format", statusCode: 400 });
            }
            if (password.length < 6) {
                return res.error({ message: "Password must be at least 6 characters", statusCode: 400 });
            }

            const user = await authService.userRegister(email, password);

            return res.success({
                data: { id: user.id, email: user.email, userId: user.userId },
                message: "User registered successfully",
                statusCode: 201,
            });
        } catch (error: any) {
            return res.error({ message: error.message, statusCode: 500, errors: error });
        }
    }

    async login(req: Request, res: Response) {
        //  #swagger.tags = ['Auth']
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return res.error({ message: "Email and password are required", statusCode: 400 });
            }

            const { user, token } = await authService.login(email, password);

            return res.success({
                data: { id: user.id, email: user.email, userId: user.userId, token },
                message: "Login successful",
            });
        } catch (error: any) {
            return res.error({ message: error.message, statusCode: 401, errors: error });
        }
    }

    async logout(req: Request, res: Response) {
        //  #swagger.tags = ['Auth']
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.error({ message: "Authorization token required", statusCode: 400 });

            const result = await authService.logout(token);
            return res.success({ data: result, message: "Logout successful" });
        } catch (error: any) {
            return res.error({ message: error.message, statusCode: 401, errors: error });
        }
    }

    async userRestrict(req: Request, res: Response) {
        //  #swagger.tags = ['Auth']
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.error({ message: "Authorization token required", statusCode: 401 });

            const user = await authService.userRestrict(token);
            return res.success({
                data: { id: user.id, email: user.email, userId: user.userId },
                message: "User validated",
            });
        } catch (error: any) {
            return res.error({ message: error.message, statusCode: 401, errors: error });
        }
    }
}

export default new AuthController();
