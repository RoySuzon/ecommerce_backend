import { Router } from "express";
import productVariantController from "./productVariant.controller";

const productVariantRoute = Router();

productVariantRoute.get("/", productVariantController.getProductVariant);
productVariantRoute.post("/", productVariantController.addProductVariant);
productVariantRoute.post("/many", productVariantController.addManyProductVariant);
productVariantRoute.put("/:id", productVariantController.updateProductVariant);

export default productVariantRoute;
