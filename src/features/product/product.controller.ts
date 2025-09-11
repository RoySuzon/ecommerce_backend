import ProductService from "./products.service";


class ProductController {


    async getProducts(req: Request, res: Response) {
        try {
            const res = ProductService.fetchProduct();
        } catch (error) {

        }
    }
    async createProducts(req: Request, res: Response) {
        const productData = req.body;

        productData
        try {
            // const products = await ProductService.createProduct(productData);
            res.json()
        } catch (error) {

        }
    }
}