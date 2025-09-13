import { Request, Response } from "express";
import ProductService from "./products.service";


class ProductController {


    async getProducts(req: Request, res: Response) {
        try {
            const result = await ProductService.fetchProduct();

            res.json(result);


        } catch (error) {

        }
    }
    // async createProducts(req: Request, res: Response) {
    //     const productData = req.body;

    //     productData
    //     try {
    //         // const products = await ProductService.createProduct(productData);
    //         res.json()
    //     } catch (error) {

    //     }
    // }
}


export default new ProductController