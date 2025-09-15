import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class BrandService {
    // Fetch Brands with optional filters
    async fetchBrand(where: Prisma.BrandWhereInput) {
        return await prisma.brand.findMany({ where });
    }

    // Insert single brand
    async insertBrand(data: Prisma.BrandCreateInput) {
        return await prisma.brand.create({ data });
    }

    // Insert multiple brands
    async insertManyBrand(data: Prisma.BrandCreateManyInput[]) {
        return await prisma.brand.createMany({
            data,
            skipDuplicates: true,
        });
    }

    // Update brand
    async updateBrand(id: number, data: Prisma.BrandUpdateInput) {
        return await prisma.brand.update({
            where: { id },
            data,
        });
    }
}

export default new BrandService();
