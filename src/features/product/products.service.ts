
import prisma from "../../prisma";

class ProductService {

    async fetchProduct() {
        return await prisma.product.findMany({
            include: {
                category: true,
                availability: true,
                variants: true,
                brand: true,
                region: true,
                simType: true,
                type: true
            }
        })
    }


    // async createProduct(product: Product): Promise<Product> {
    //     return await prisma.product.create({
    //         data: product
    //     })
    // }
}



export default new ProductService