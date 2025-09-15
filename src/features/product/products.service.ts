import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class ProductService {
    // Fetch products with optional filters
    async fetchProduct(where: Prisma.ProductWhereInput) {
        return await prisma.product.findMany({
            where, include: {
                brand: true,
                category: true,
                availability: true,
                variants: true,
                specificationsRel: true
            }
        });
    }

    // Insert single product
    async insertProduct(data: Prisma.ProductCreateInput) {
        return await prisma.product.create({ data });
    }

    // Insert multiple products
    async insertManyProduct(data: Prisma.ProductCreateManyInput[]) {
        return await prisma.product.createMany({
            data,
            skipDuplicates: true,
        });
    }

    // Update product
    async updateProduct(id: number, data: Prisma.ProductUpdateInput) {
        return await prisma.product.update({
            where: { id },
            data,
        });
    }
}

export default new ProductService();
