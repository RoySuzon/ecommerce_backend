import { Request, Response } from "express";
import productvariantsService from "./productvariants.service";

class ProductvariantsController {
    async add(req: Request, res: Response) {
        try {
            const result = await productvariantsService.insert();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async addMany(req: Request, res: Response) {
        try {
            const result = await productvariantsService.insertMany();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result = await productvariantsService.update();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await productvariantsService.delete();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const result = await productvariantsService.fetch({});
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
}

export default new ProductvariantsController();
