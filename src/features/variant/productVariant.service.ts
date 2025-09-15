import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class ProductVariantService {
    // Fetch ProductVariants with optional filters
    async fetchProductVariant(where: Prisma.ProductVariantWhereInput) {
        return await prisma.productVariant.findMany({ where });
    }

    // Insert single ProductVariant
    async insertProductVariant(data: Prisma.ProductVariantCreateInput) {
        return await prisma.productVariant.create({ data });
    }

    // Insert multiple ProductVariants
    async insertManyProductVariant(data: Prisma.ProductVariantCreateManyInput[]) {
        return await prisma.productVariant.createMany({
            data,
            skipDuplicates: true,
        });
    }

    // Update ProductVariant
    async updateProductVariant(id: number, data: Prisma.ProductVariantUpdateInput) {
        return await prisma.productVariant.update({
            where: { id },
            data,
        });
    }
}

export default new ProductVariantService();
