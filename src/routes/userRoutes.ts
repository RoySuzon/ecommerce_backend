import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

export default router;
