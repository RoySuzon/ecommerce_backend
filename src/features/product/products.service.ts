
import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class ProductService {


    async fetchProduct(filter: Prisma.ProductWhereInput) {
        return await prisma.product.findMany({
            where: filter,
            include: {
                category: true,
                availability: true,
                brand: true,
                variants: true

            }
            // include: { videos: true, brand: true, type: true, region: true, availability: true, simType: true, category: true },
        })
    }
    async fetchVariant(id: number) {
        return await prisma.productVariant.findUnique({
            where: {
                id: id
            }
        })

    }


    async createProduct(product: Prisma.ProductCreateInput) {
        return await prisma.product.create({
            data: product
        })
    }
}


export default new ProductService