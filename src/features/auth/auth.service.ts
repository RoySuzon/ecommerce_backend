
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../generated/prisma";
import prisma from "../../prisma";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Helper to generate userId from email
function _getUserIdFromEmail(email: string): string {
    if (!email.includes("@")) throw new Error("Invalid email format");
    return email.split("@")[0].replace(/\./g, "_").toLowerCase();
}

class AuthService {
    // Register a new user
    async userRegister(email: string, password: string): Promise<User> {
        const userId = _getUserIdFromEmail(email);
        const hashedPassword = await bcrypt.hash(password, 10);

        return prisma.user.create({
            data: { email, userId, password: hashedPassword },
        });
    }

    // Login user and return token
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid email or password");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid email or password");

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        return { user, token };
    }

    // Logout user by adding JWT to blacklist
    async logout(token: string) {
        if (!token) throw new Error("Token required");

        let payload: any;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch {
            throw new Error("Invalid or expired token");
        }

        const expiresAt = new Date(payload.exp * 1000);

        await prisma.tokenBlacklist.create({
            data: { token, expiresAt },
        });

        return { message: "Logged out successfully" };
    }

    // Validate JWT and return current user
    async userRestrict(token: string): Promise<User> {
        if (!token) throw new Error("Token required");

        // Check if token is blacklisted
        const blacklisted = await prisma.tokenBlacklist.findUnique({ where: { token } });
        if (blacklisted) throw new Error("Token has been logged out");

        let payload: any;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch {
            throw new Error("Invalid token");
        }

        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) throw new Error("User not found");

        return user;
    }
}

export default new AuthService();
