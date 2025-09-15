import { Router } from "express";
import brandController from "./brand.controller";

const brandRoute = Router();

brandRoute.get("/", brandController.getBrand);
brandRoute.post("/", brandController.addBrand);
brandRoute.post("/many", brandController.addManyBrand);
brandRoute.put("/:id", brandController.updateBrand);

export default brandRoute;
