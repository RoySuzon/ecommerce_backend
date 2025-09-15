import { Router } from "express";
import availabilityController from "./availability.controller";

const availabilityRoute = Router();

availabilityRoute.get("/", availabilityController.getAvailability);
availabilityRoute.post("/", availabilityController.addAvailability);
availabilityRoute.post("/many", availabilityController.addManyAvailability);
availabilityRoute.put("/:id", availabilityController.updateAvailability);

export default availabilityRoute;
