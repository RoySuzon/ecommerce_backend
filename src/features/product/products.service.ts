
import { Product } from "../../../generated/prisma";
import prisma from "../../prisma";

class ProductService {

    async fetchProduct() {
        return await prisma.product.findMany({
            include: {
                catagory: true
            }
        })
    }


    async createProduct(product: Product): Promise<Product> {
        return await prisma.product.create({
            data: product
        })
    }
}



export default new ProductService