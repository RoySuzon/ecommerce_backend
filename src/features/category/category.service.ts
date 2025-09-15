import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class CategoryService {

    //Fertch Category
    async fetchCatagory(where: Prisma.CategoryWhereInput) {
        return await prisma.category.findMany({
            where
        })
    }

    //Insert Category
    async insertCategory(data: Prisma.CategoryCreateInput) {
        return prisma.category.create({ data });
    }

    //Insert Many Category
    async insertManyCategory(data: Prisma.CategoryCreateManyInput[]) {
        return await prisma.category.createMany({
            data,
            skipDuplicates: true, // optional: avoids errors on duplicate unique fields
        });
    }

    //Update

    async updateCategory(id: number, data: Prisma.CategoryUpdateInput) {
        return await prisma.category.update({
            where: { id },
            data,
        });
    }



}


export default new CategoryService;