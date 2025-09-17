import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import specificationtypeService from "./specificationtype.service";

class SpecificationtypeController {
    async add(req: Request, res: Response) {
        //  #swagger.tags = ['Specificationtype']
        try {
            const { name, specifications } = req.body as {
                name: string;
                specifications: Prisma.AllSpecificationsCreateManyInput[];
            };

            const data: Prisma.SpecificationsTypeCreateInput = {
                name,
                AllSpecifications: {
                    createMany: {
                        data: specifications === (undefined) ? [] : specifications, // array of { fieldName: value }
                        skipDuplicates: true,
                    },
                },
            };

            const result = await specificationtypeService.insert(data);

            return res.success({
                data: result,
            });
        } catch (error: any) {
            return res.error({
                message: error.message,
                errors: error,
            });
        }
    }

    async addMany(req: Request, res: Response) {
        //  #swagger.tags = ['Specificationtype']
        const { data } = req.body;
        try {
            const prismaArgs: Prisma.SpecificationsTypeCreateInput[] = (data as [string]).map((e) => ({
                name: e
            }));

            const result = await specificationtypeService.insertMany(prismaArgs);
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        //  #swagger.tags = ['Specificationtype']
        try {
            const result = await specificationtypeService.update();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        //  #swagger.tags = ['Specificationtype']
        try {
            const result = await specificationtypeService.delete();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
        //  #swagger.tags = ['Specificationtype']
        const { } = req.query;
        try {

            const result = await specificationtypeService.fetch({});
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
}

export default new SpecificationtypeController();
