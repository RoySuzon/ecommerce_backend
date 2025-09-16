import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class SpecificationtypeService {
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

    async fetch(when: Prisma.SpecificationsTypeWhereInput) {
        return await prisma.specificationsType.findMany({ select: { id: true, name: true } });
        // TODO: implement fetch logic
    }
}

export default new SpecificationtypeService();
