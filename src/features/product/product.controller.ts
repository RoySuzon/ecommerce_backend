import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import productsService from "./products.service";

class ProductController {
    // Get products
    async getProduct(req: Request, res: Response) {
        const filter: Prisma.ProductWhereInput = {
            ...(req.query.name && { name: { contains: req.query.name as string, mode: "insensitive" } }),
            ...(req.query.productCode && { productCode: { contains: req.query.productCode as string, mode: "insensitive" } }),
            ...(req.query.id && !isNaN(Number(req.query.id)) && { id: Number(req.query.id) }),
            ...(req.query.brandId && !isNaN(Number(req.query.brandId)) && { brandId: Number(req.query.brandId) }),
            ...(req.query.categoryId && !isNaN(Number(req.query.categoryId)) && { categoryId: Number(req.query.categoryId) }),
            ...(req.query.availabilityId && !isNaN(Number(req.query.availabilityId)) && { availabilityId: Number(req.query.availabilityId) }),
        };

        try {
            const data = await productsService.fetchProduct(filter);
            return res.success({ data });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    // Add single product
    async addProduct(req: Request, res: Response) {
        try {
            const { name, model, description, deliveryTimescale, specifications, brandId, categoryId, availabilityId } = req.body;

            if (!name || !brandId || !categoryId || !availabilityId) {
                return res.error({ message: "Missing required fields", statusCode: 400 });
            }

            const data = await productsService.insertProduct({
                name,
                model,
                description,
                deliveryTimescale,
                specifications,
                brand: { connect: { id: brandId } },
                category: { connect: { id: categoryId } },
                availability: "IN_STOCK"
            });

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Add multiple products
    async addManyProduct(req: Request, res: Response) {
        try {
            const products = req.body.products;

            if (!Array.isArray(products) || products.length === 0) {
                return res.error({ message: "Products array is required", statusCode: 400 });
            }

            const data = await productsService.insertManyProduct(products);
            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Update product
    async updateProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, model, productCode, description, deliveryTimescale, specifications, brandId, categoryId, availabilityId } = req.body;

            if (isNaN(id)) return res.error({ message: "Invalid product id", statusCode: 400 });

            const updateData: Prisma.ProductUpdateInput = {
                ...(name && { name }),
                ...(model && { model }),
                ...(productCode && { productCode }),
                ...(description && { description }),
                ...(deliveryTimescale && { deliveryTimescale }),
                ...(specifications && { specifications }),
                ...(brandId && { brand: { connect: { id: brandId } } }),
                ...(categoryId && { category: { connect: { id: categoryId } } }),
                ...(availabilityId && { availability: { connect: { id: availabilityId } } }),
            };

            if (Object.keys(updateData).length === 0) {
                return res.error({ message: "Nothing to update", statusCode: 400 });
            }

            const updatedProduct = await productsService.updateProduct(id, updateData);
            return res.success({ data: updatedProduct, statusCode: 200 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
}

export default new ProductController();
