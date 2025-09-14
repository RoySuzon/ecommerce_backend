import { PrismaClient } from "../generated/prisma/index";

const prisma = new PrismaClient(
    {
        log: ["query"]
    }
);

export default prisma;
