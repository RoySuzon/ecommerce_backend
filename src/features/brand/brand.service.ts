import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class BrandService {
    async fetchBrand(where: Prisma.BrandWhereInput = {}) {
        return await prisma.brand.findMany({ where });
    }

    async insertBrand(data: Prisma.BrandCreateInput) {
        return await prisma.brand.create({ data });
    }

    async insertManyBrand(data: Prisma.BrandCreateManyInput[]) {
        return await prisma.brand.createMany({ data, skipDuplicates: true });
    }

    async updateBrand(id: number, data: Prisma.BrandUpdateInput) {
        return await prisma.brand.update({ where: { id }, data });
    }
}

export default new BrandService();
