import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import allspecificationsService from "./allspecifications.service";

class AllspecificationsController {
    async add(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {
            const result = await allspecificationsService.insert();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async addMany(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {
            const result = await allspecificationsService.insertMany();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {
            const result = await allspecificationsService.update();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {
            const result = await allspecificationsService.delete();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {

            const data: Prisma.AllSpecificationsWhereInput = {
                ...(req.query.value && { value: { contains: req.query.value as string, mode: "insensitive" } }),
                ...({ type: { name: { contains: req.query.typeName as string, mode: "insensitive" } } })
            }
            const result = await allspecificationsService.fetch(data);
            const newResult = result.map(({ type, ...item }) => ({
                ...item,
                type_name: type.name
            }));
            return res.success({ data: newResult, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
    async getSpecificationByProductId(req: Request, res: Response) {
        //  #swagger.tags = ['All Specifications']
        try {
            const result = await allspecificationsService.productWiseSpecifications(Number(req.params.id));
            const newResult = result.map(({ type, ...item }) => ({
                ...item,
                type_name: type.name
            }));
            return res.success({ data: newResult, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
}


export default new AllspecificationsController();
