import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class UserService {
    async insert(data: Prisma.UserCreateInput) {
        try {
            return await prisma.user.create({ data })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Unique constraint failed
                // if (error.code === "P2002") {
                const target = (error.meta?.target as string);
                throw new Error(` ${target}`);
                // }
            }
            throw error;

        }
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

    async fetch(where: Prisma.UserWhereInput) {
        return await prisma.user.findMany({ where })

        // TODO: implement fetch logic
    }
}

export default new UserService();
