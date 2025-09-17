import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import categoryService from "./category.service";

class CategoryController {

    async getCategory(req: Request, res: Response) {
        //  #swagger.tags = ['Category']

        const filter: Prisma.CategoryWhereInput = {
            ...(req.query.name && {
                name: {
                    contains: req.query.name as string,
                    mode: 'insensitive',
                },
            }),
            ...(req.query.id && !isNaN(Number(req.query.id)) && {
                id: Number(req.query.id),
            }),
        };
        try {
            const data = await categoryService.fetchCatagory(filter);
            return res.success({ data })
        } catch (errors: any) {
            return res.error({ message: errors.message, errors })
        }

    }
    async addCategory(req: Request, res: Response) {
        //  #swagger.tags = ['Category']
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ success: false, message: "Name is required" });
            }

            const data = await categoryService.insertCategory({ name });

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
    async addManyCategory(req: Request, res: Response) {
        //  #swagger.tags = ['Category']
        try {
            const categories = req.body.categories; // expect [{name: 'A'}, {name: 'B'}]

            if (!Array.isArray(categories) || categories.length === 0) {
                return res.status(400).json({ success: false, message: "Categories array is required" });
            }

            const data = await categoryService.insertManyCategory(categories);
            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
    async updateCategory(req: Request, res: Response) {
        //  #swagger.tags = ['Category']
        try {
            const id = Number(req.params.id);
            const { name } = req.body;

            if (isNaN(id)) return res.error({ message: "Invalid category id", statusCode: 400 });
            if (!name) return res.error({ message: "Name is required to update", statusCode: 400 });

            const updatedCategory = await categoryService.updateCategory(id, { name });

            return res.success({ data: updatedCategory, statusCode: 200 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
}










export default new CategoryController