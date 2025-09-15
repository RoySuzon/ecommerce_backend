import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import specificationService from "./specification.service";

class SpecificationController {
    // Get specifications
    async getSpecification(req: Request, res: Response) {
        const filter: Prisma.SpecificationWhereInput = {
            ...(req.query.key && {
                key: { contains: req.query.key as string, mode: "insensitive" },
            }),
            ...(req.query.id && !isNaN(Number(req.query.id)) && {
                id: Number(req.query.id),
            }),
            ...(req.query.productId && !isNaN(Number(req.query.productId)) && {
                productId: Number(req.query.productId),
            }),
        };

        try {
            const data = await specificationService.fetchSpecification(filter);
            return res.success({ data });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    // Add single specification
    async addSpecification(req: Request, res: Response) {
        try {
            const { key, value, productId } = req.body;

            if (!key || !value || !productId) {
                return res.error({ message: "Key, value, and productId are required", statusCode: 400 });
            }
            const data = await specificationService.insertSpecification({ key, value, product: { connect: productId } });

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Add multiple specifications
    async addManySpecification(req: Request, res: Response) {
        try {
            const specifications = req.body.specifications;

            if (!Array.isArray(specifications) || specifications.length === 0) {
                return res.error({ message: "Specifications array is required", statusCode: 400 });
            }

            const data = await specificationService.insertManySpecification(specifications);

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Update specification
    async updateSpecification(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { key, value } = req.body;

            if (isNaN(id)) return res.error({ message: "Invalid specification id", statusCode: 400 });
            if (!key && !value) return res.error({ message: "Nothing to update", statusCode: 400 });

            const updatedSpecification = await specificationService.updateSpecification(id, { key, value });

            return res.success({ data: updatedSpecification, statusCode: 200 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
}

export default new SpecificationController();
