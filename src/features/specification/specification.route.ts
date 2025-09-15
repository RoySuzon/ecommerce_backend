import { Router } from "express";
import specificationController from "./specification.controller";

const specificationRoute = Router();

specificationRoute.get("/", specificationController.getSpecification);
specificationRoute.post("/", specificationController.addSpecification);
specificationRoute.post("/many", specificationController.addManySpecification);
specificationRoute.put("/:id", specificationController.updateSpecification);

export default specificationRoute;
