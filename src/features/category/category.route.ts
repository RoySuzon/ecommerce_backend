import { Router } from "express";
import categoryController from "./category.controller";


const categoryRoute = Router()


categoryRoute.get('/', categoryController.getCategory);
categoryRoute.post('/', categoryController.addCategory);
categoryRoute.post('/many', categoryController.addManyCategory);
categoryRoute.put('/:id', categoryController.updateCategory);

export default categoryRoute;