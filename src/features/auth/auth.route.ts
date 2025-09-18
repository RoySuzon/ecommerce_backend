import express from "express";
import authController from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = express.Router();

router.post("/register", authController.userRegister);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/me", authMiddleware, authController.userRestrict);
router.get("/profile", authMiddleware, (req, res) => {
    // req.user is available here
    res.json({ message: "Protected route", user: req.user });
});

export default router;
