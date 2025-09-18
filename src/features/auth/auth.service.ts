import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../generated/prisma";
import prisma from "../../prisma"; // import blacklist function
import { getErrorMessage } from "./auth.controller";
import { blacklistToken } from "./auth.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Helper to generate userId from email
function _getUserIdFromEmail(email: string): string {
    if (!email.includes("@")) throw new Error("Invalid email format");
    return email.split("@")[0].replace(/\./g, "_").toLowerCase();
}

class AuthService {
    // Register a new user
    async userRegister(email: string, password: string) {
        try {
            const userId = _getUserIdFromEmail(email);
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { email, userId, password: hashedPassword }, select: { id: true, email: true, userId: true, firstName: true, lastName: true }
            });
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10h" });
            return { user, token }
        } catch (error: any) {
            getErrorMessage(error)
        }
    }

    // Login user and return token
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid email or password");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid email or password");

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10h" });
        return { user, token };
    }

    // Logout user (blacklist token)
    async logout(token: string) {
        if (!token) throw new Error("Token required");

        // Verify token before blacklisting
        try {
            jwt.verify(token, JWT_SECRET);
        } catch {
            throw new Error("Invalid or expired token");
        }

        // Add token to in-memory blacklist
        blacklistToken(token);

        return { message: "Logged out successfully" };
    }

    // Validate JWT and return current user
    async userRestrict(token: string) {
        if (!token) throw new Error("Token required");

        // Remove "Bearer " prefix if present
        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        // Check in-memory blacklist
        if ((global as any).tokenBlacklist?.has(actualToken)) {
            throw new Error("Token has been revoked");
        }

        let payload: any;
        try {
            payload = jwt.verify(actualToken, JWT_SECRET);
        } catch {
            throw new Error("Invalid or expired token");
        }

        // Fetch user from DB
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, email: true, firstName: true, lastName: true, userId: true },
        });

        if (!user) throw new Error("User not found");

        return user;
    }
}

export default new AuthService();
