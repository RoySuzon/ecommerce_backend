import { Router } from "express";
import commonController from "./common.controller";
const commonRoute = Router();

// Example: /api/common/dropdown?type=brand
commonRoute.get("/dropdown", commonController.dropdown);

export default commonRoute;
