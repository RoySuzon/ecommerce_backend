import { AvailabilityStatus } from "../../../generated/prisma";
import prisma from "../../prisma";

class CommonService {
    async getBrands(name: string, take?: number) {
        return prisma.brand.findMany({
            where: {
                name: {
                    contains: name, mode: "insensitive"
                }
            },
            select: { id: true, name: true, logoUrl: true },
            orderBy: { name: "asc" },
            take: take
        });
    }

    async getCategories(name: string, take?: any) {
        return prisma.category.findMany({
            where: {
                name: {
                    contains: name, mode: "insensitive"
                }
            },

            select: { id: true, name: true },
            orderBy: { name: "asc" },
            take: take
        });
    }

    async getAvailabilityByValue(name: string): Promise<AvailabilityStatus[] | undefined> {
        return Object.values(AvailabilityStatus).filter(v =>
            v.toLowerCase().includes(name.toLowerCase())
        );
    }
    async getSpecificationTypes(name: string, take?: any) {
        return prisma.specificationsType.findMany({
            where: {
                name: {
                    contains: name, mode: "insensitive"
                }
            },
            select: { id: true, name: true, },
            orderBy: { name: "asc" },
            take: take
        })
    }
}

export default new CommonService();
