import { AvailabilityStatus } from "../../../generated/prisma";
import prisma from "../../prisma";

class CommonService {
    async getBrands() {
        return prisma.brand.findMany({
            select: { id: true, name: true, logoUrl: true },
            orderBy: { name: "asc" },
        });
    }

    async getCategories() {
        return prisma.category.findMany({
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });
    }

    async getAvailabilities() {
        return Object.values(AvailabilityStatus)
    }

    async getSpecificationTypes() {
        return prisma.specificationsType.findMany({
            select: { id: true, name: true, },
            orderBy: { name: "asc" },
        })
    }
}

export default new CommonService();
