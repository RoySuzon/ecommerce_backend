import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class AvailabilityService {
    // Fetch Availability records with optional filters
    async fetchAvailability(where: Prisma.AvailabilityWhereInput) {
        return await prisma.availability.findMany({ where });
    }

    // Insert single Availability
    async insertAvailability(data: Prisma.AvailabilityCreateInput) {
        return await prisma.availability.create({ data });
    }

    // Insert multiple Availability records
    async insertManyAvailability(data: Prisma.AvailabilityCreateManyInput[]) {
        return await prisma.availability.createMany({
            data,
            skipDuplicates: true,
        });
    }

    // Update Availability
    async updateAvailability(id: number, data: Prisma.AvailabilityUpdateInput) {
        return await prisma.availability.update({
            where: { id },
            data,
        });
    }
}

export default new AvailabilityService();
