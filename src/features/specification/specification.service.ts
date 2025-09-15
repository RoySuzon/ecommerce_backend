import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class SpecificationService {
    // Fetch specifications with optional filters
    async fetchSpecification(where: Prisma.SpecificationWhereInput) {
        return await prisma.specification.findMany({ where });
    }

    // Insert single specification
    async insertSpecification(data: Prisma.SpecificationCreateInput) {
        return await prisma.specification.create({ data });
    }

    // Insert multiple specifications
    async insertManySpecification(data: Prisma.SpecificationCreateManyInput[]) {
        return await prisma.specification.createMany({
            data,
            skipDuplicates: true,
        });
    }

    // Update specification
    async updateSpecification(id: number, data: Prisma.SpecificationUpdateInput) {
        return await prisma.specification.update({
            where: { id },
            data,
        });
    }
}

export default new SpecificationService();
