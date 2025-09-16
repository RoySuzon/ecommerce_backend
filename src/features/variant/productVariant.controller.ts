import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import productVariantService from "./productVariant.service";

class ProductVariantController {
    // Get ProductVariants
    async getProductVariant(req: Request, res: Response) {
        const filter: Prisma.ProductVariantWhereInput = {
            ...(req.query.id && !isNaN(Number(req.query.id)) && { id: Number(req.query.id) }),
            ...(req.query.productId && !isNaN(Number(req.query.productId)) && { productId: Number(req.query.productId) }),
            ...(req.query.color && { color: { contains: req.query.color as string, mode: "insensitive" } }),
            ...(req.query.storage && { storage: { contains: req.query.storage as string, mode: "insensitive" } }),
            ...(req.query.ram && { ram: { contains: req.query.ram as string, mode: "insensitive" } }),
        };

        try {
            const data = await productVariantService.fetchProductVariant(filter);
            return res.success({ data });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    // Add single ProductVariant
    async addProductVariant(req: Request, res: Response) {
        try {
            const { ram, regularPrice, discountPrice, stockQty, images, productId, productCode } = req.body;

            if (!regularPrice || !productId || !productCode) {
                return res.error({ message: "regularPrice , productId , productCode are required", statusCode: 400 });
            }

            const data = await productVariantService.insertProductVariant({
                productCode:
                    ram,
                regularPrice,
                discountPrice,
                stockQty: stockQty ?? 0,
                images: images ?? [],
                product: {
                    connect: {
                        id: productId
                    }
                },
            });

            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Add multiple ProductVariants
    async addManyProductVariant(req: Request, res: Response) {
        try {
            const variants = req.body.variants;

            if (!Array.isArray(variants) || variants.length === 0) {
                return res.error({ message: "Variants array is required", statusCode: 400 });
            }

            const data = await productVariantService.insertManyProductVariant(variants);
            return res.success({ data, statusCode: 201 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }

    // Update ProductVariant
    async updateProductVariant(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { color, storage, ram, regularPrice, discountPrice, stockQty, images } = req.body;

            if (isNaN(id)) return res.error({ message: "Invalid variant id", statusCode: 400 });

            const updateData: Prisma.ProductVariantUpdateInput = {
                ...(color !== undefined && { color }),
                ...(storage !== undefined && { storage }),
                ...(ram !== undefined && { ram }),
                ...(regularPrice !== undefined && { regularPrice }),
                ...(discountPrice !== undefined && { discountPrice }),
                ...(stockQty !== undefined && { stockQty }),
                ...(images !== undefined && { images }),
            };

            if (Object.keys(updateData).length === 0) {
                return res.error({ message: "Nothing to update", statusCode: 400 });
            }

            const updatedVariant = await productVariantService.updateProductVariant(id, updateData);
            return res.success({ data: updatedVariant, statusCode: 200 });
        } catch (error: any) {
            return res.error({ message: "Internal server error", errors: error });
        }
    }
}

export default new ProductVariantController();
