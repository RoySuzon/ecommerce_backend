import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import { default as ProductService } from "./products.service";


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


            // 🔹 Relation IDs (exact match)
            ...(req.query.brandId && { brandId: Number(req.query.brandId) }),
            ...(req.query.typeId && { typeId: Number(req.query.typeId) }),
            ...(req.query.regionId && { regionId: Number(req.query.regionId) }),
            ...(req.query.availabilityId && { availabilityId: Number(req.query.availabilityId) }),
            ...(req.query.simTypeId && { simTypeId: Number(req.query.simTypeId) }),
            ...(req.query.categoryId && { categoryId: Number(req.query.categoryId) }),

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


                        { description: { contains: String(req.query.q), mode: "insensitive" } },

                    ],
                }
                : {}),
        };
        try {
            const result = await ProductService.fetchProduct(filter);

            res.status(401).json(result);


        } catch (error) {

        }
    }
    async createProducts(req: Request, res: Response) {

        // const {
        //     name,
        //     brandId,
        //     model,
        //     productCode,
        //     availabilityId,
        //     deliveryTimescale,
        //     specifications,
        //     typeId,
        //     simTypeId,
        //     regionId,
        //     categoryId,
        //     description,
        // } = req.body;

        // // Validate mandatory fields
        // if (
        //     !name ||
        //     !brandId ||
        //     !model ||
        //     !productCode ||
        //     !availabilityId ||
        //     !deliveryTimescale ||
        //     !typeId ||
        //     !simTypeId ||
        //     !regionId ||
        //     !categoryId
        // ) {
        //     return res.status(400).json({ message: "Missing required fields" });
        // }
        // const productData: Prisma.ProductCreateInput = {
        //     name,

        //     // model,
        //     // productCode,
        //     // deliveryTimescale,
        //     description: description || undefined,
        //     specifications: specifications || undefined, // should be a valid JSON object
        //     brand: { connect: { id: brandId } },
        //     // availability: { connect: { id: availabilityId } },
        //     // type: { connect: { id: typeId } },
        //     // simType: { connect: { id: simTypeId } },
        //     // region: { connect: { id: regionId } },
        //     // category: { connect: { id: categoryId } },
        // };

        try {
            // const newProduct = await productsService.createProduct(productData)
            // res.json(newProduct);
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
}


export default new ProductController