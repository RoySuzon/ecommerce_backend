import { Request, Response } from "express";
import specificationtypeService from "./specificationtype.service";

class SpecificationtypeController {
    async add(req: Request, res: Response) {
        try {
            const result = await specificationtypeService.insert();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async addMany(req: Request, res: Response) {
        try {
            const result = await specificationtypeService.insertMany();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result = await specificationtypeService.update();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await specificationtypeService.delete();
            return res.success({ data: result, });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
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
