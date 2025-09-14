import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import ProductService from "./products.service";


class ProductController {


    async getProducts(req: Request, res: Response) {

        const filter: Prisma.ProductWhereInput = {
            // 🔹 Simple string fields
            ...(req.query.name && { name: { contains: String(req.query.name), mode: "insensitive" } }),
            ...(req.query.model && { model: { contains: String(req.query.model), mode: "insensitive" } }),
            ...(req.query.productCode && { productCode: { contains: String(req.query.productCode), mode: "insensitive" } }),
            ...(req.query.deliveryTimescale && { deliveryTimescale: { contains: String(req.query.deliveryTimescale), mode: "insensitive" } }),

            // 🔹 Optional string fields
            ...(req.query.description && { description: { contains: String(req.query.description), mode: "insensitive" } }),

            // 🔹 JSON field (specifications)
            ...(req.query.specification && { specifications: { array_contains: [req.query.specification] } }), // if Json[]

            // 🔹 Relation IDs (exact match)
            ...(req.query.brandId && { brandId: String(req.query.brandId) }),
            ...(req.query.typeId && { typeId: String(req.query.typeId) }),
            ...(req.query.regionId && { regionId: String(req.query.regionId) }),
            ...(req.query.availabilityId && { availabilityId: String(req.query.availabilityId) }),
            ...(req.query.simTypeId && { simTypeId: String(req.query.simTypeId) }),
            ...(req.query.categoryId && { categoryId: String(req.query.categoryId) }),

            // 🔹 Variants (nested relation filter)
            ...(req.query.minRegularPrice || req.query.maxRegularPrice
                ? {
                    variants: {
                        some: {
                            regularPrice: {
                                ...(req.query.minRegularPrice && { gte: Number(req.query.minRegularPrice) }),
                                ...(req.query.maxRegularPrice && { lte: Number(req.query.maxRegularPrice) }),
                            },
                        },
                    },
                }
                : {}),

            // 🔹 Global search (`q`) across multiple fields
            ...(req.query.q
                ? {
                    OR: [
                        { name: { contains: String(req.query.q), mode: "insensitive" } },
                        { model: { contains: String(req.query.q), mode: "insensitive" } },
                        { productCode: { contains: String(req.query.q), mode: "insensitive" } },
                        { description: { contains: String(req.query.q), mode: "insensitive" } },
                        { specifications: { array_contains: [req.query.q] } },
                    ],
                }
                : {}),
        };
        try {
            const result = await ProductService.fetchProduct(filter);

            res.json(result);


        } catch (error) {

        }
    }
    // async createProducts(req: Request, res: Response) {
    //     const productData = req.body;

    //     productData
    //     try {
    //         // const products = await ProductService.createProduct(productData);
    //         res.json()
    //     } catch (error) {

    //     }
    // }
}


export default new ProductController