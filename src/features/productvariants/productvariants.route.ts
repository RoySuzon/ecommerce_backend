import { Router } from "express";
import productvariantsController from "./productvariants.controller";

const productvariantsRoute = Router();

productvariantsRoute.get("/", productvariantsController.get);
productvariantsRoute.post("/", productvariantsController.add);
productvariantsRoute.post("/many", productvariantsController.addMany);
productvariantsRoute.put("/:id", productvariantsController.update);
productvariantsRoute.delete("/:id", productvariantsController.delete);

export default productvariantsRoute;
