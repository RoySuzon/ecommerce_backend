import { Router } from "express";
import UserController from "./user.controller";

const userRoute = Router();

userRoute.get("/", UserController.get);
userRoute.post("/", UserController.add);
userRoute.post("/many", UserController.addMany);
userRoute.put("/:id", UserController.update);
userRoute.delete("/:id", UserController.delete);

export default userRoute;
