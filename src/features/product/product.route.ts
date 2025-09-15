import { Router } from "express";
import productController from "./product.controller";

const productRoute = Router();

productRoute.get("/", productController.getProduct);
productRoute.post("/", productController.addProduct);
productRoute.post("/many", productController.addManyProduct);
productRoute.put("/:id", productController.updateProduct);

export default productRoute;
