import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import brandService from "./brand.service";

class BrandController {
    // Get brands
    async getBrand(req: Request, res: Response) {
        const filter: Prisma.BrandWhereInput = {
            ...(req.query.name && {
                name: { contains: req.query.name as string, mode: "insensitive" },
            }),
            ...(req.query.id && !isNaN(Number(req.query.id)) && {
                id: Number(req.query.id),
            }),
        };

        try {
            const data = await brandService.fetchBrand(filter);
            return res.success({ data });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    // Add single brand
    async addBrand(req: Request, res: Response) {
        try {
            const { name, logoUrl } = req.body;

            if (!name) return res.error({ message: "Name is required", statusCode: 400 });

            const data = await brandService.insertBrand({ name, logoUrl });

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Add many brands
    async addManyBrand(req: Request, res: Response) {
        try {
            const brands = req.body.brands;

            if (!Array.isArray(brands) || brands.length === 0) {
                return res.error({ message: "Brands array is required", statusCode: 400 });
            }

            const data = await brandService.insertManyBrand(brands);

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Update brand
    async updateBrand(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, logoUrl } = req.body;

            if (isNaN(id)) return res.error({ message: "Invalid brand id", statusCode: 400 });
            if (!name && !logoUrl) return res.error({ message: "Nothing to update", statusCode: 400 });

            const updatedBrand = await brandService.updateBrand(id, { name, logoUrl });

            return res.success({ data: updatedBrand, statusCode: 200 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
}

export default new BrandController();
