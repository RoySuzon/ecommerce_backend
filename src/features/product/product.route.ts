import { Router } from "express";
import productController from "./product.controller";



const productRoute = Router();


productRoute.get('/', productController.getProducts);
productRoute.post('/', productController.createProducts);


export default productRoute