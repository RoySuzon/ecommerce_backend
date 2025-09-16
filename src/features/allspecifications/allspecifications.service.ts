import prisma from "../../prisma";

class AllspecificationsService {
    async insert() {
        // TODO: implement insert logic
    }

    async insertMany() {
        // TODO: implement bulk insert logic
    }

    async update() {
        // TODO: implement update logic
    }

    async delete() {
        // TODO: implement delete logic
    }

    async fetch(where: any) {
        return await prisma.allSpecifications.findMany({ where, orderBy: { id: "desc" }, select: { type: { select: { name: true } }, id: true, value: true } });
        // TODO: implement fetch logic
    }

    async productWiseSpecifications(productId: number) {
        return await prisma.allSpecifications.findMany({
            where: {
                ProductSpecification: {
                    every: {
                        productId: productId
                    }
                }
            }, orderBy: { id: "desc" }, select: { type: { select: { name: true } }, id: true, value: true }
        });
        // TODO: implement fetch logic
    }
}

export default new AllspecificationsService();
