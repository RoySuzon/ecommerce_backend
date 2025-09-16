import { Router } from "express";
import allspecificationsController from "./allspecifications.controller";

const allspecificationsRoute = Router();

allspecificationsRoute.get("/", allspecificationsController.get);
allspecificationsRoute.post("/", allspecificationsController.add);
allspecificationsRoute.post("/many", allspecificationsController.addMany);
allspecificationsRoute.put("/:id", allspecificationsController.update);
allspecificationsRoute.delete("/:id", allspecificationsController.delete);
allspecificationsRoute.get("/:id", allspecificationsController.getSpecificationByProductId);

export default allspecificationsRoute;
