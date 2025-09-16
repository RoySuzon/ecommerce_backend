import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class SpecificationtypeService {
    async insert(data: Prisma.SpecificationsTypeCreateInput) {
        return await prisma.specificationsType.create({ data })
        // TODO: implement insert logic
    }


    async insertMany(data: Prisma.SpecificationsTypeCreateManyAndReturnArgs) {

        return await prisma.specificationsType.createManyAndReturn(data)
        // TODO: implement bulk insert logic
    }

    async update() {
        // TODO: implement update logic
    }

    async delete() {
        // TODO: implement delete logic
    }

    async fetch(when: Prisma.SpecificationsTypeWhereInput) {
        return await prisma.specificationsType.findMany({ select: { id: true, name: true } });
        // TODO: implement fetch logic
    }
}

export default new SpecificationtypeService();
