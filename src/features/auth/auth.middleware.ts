import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include `user`
declare global {
    namespace Express {
        interface Request {
            user?: any; // Replace `any` with your actual User type
        }
    }
}

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// In-memory token blacklist (for demo, in production use Redis or similar)
const tokenBlacklist = new Set<string>();

// Function to blacklist a token
export function blacklistToken(token: string) {
    tokenBlacklist.add(token);
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.error({
                status: "unauthorized",
                message: "Authorization header missing",
                statusCode: 401
            });
        }

        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.error({
                status: "unauthorized",
                message: "Authorization token malformed",
                statusCode: 401
            });
        }

        // Check if token is blacklisted
        if (tokenBlacklist.has(token)) {
            return res.error({
                status: "unauthorized",
                message: "Token has been revoked",
                statusCode: 401
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };

        // Optional: fetch user from DB if needed
        // const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        // if (!user) return res.status(401).json({ status: "unauthorized", message: "User not found" });

        req.user = decoded; // Attach user info to request

        next(); // Authorized
    } catch (error: any) {
        console.error("Auth middleware error:", error);
        return res.error({
            status: "unauthorized",
            message: error?.message || "Unauthorized access",
            statusCode: 401

        });
    }
}
