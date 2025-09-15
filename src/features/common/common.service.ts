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
        return prisma.availability.findMany({
            select: { id: true, status: true },
            orderBy: { id: "asc" },
        });
    }
}

export default new CommonService();
