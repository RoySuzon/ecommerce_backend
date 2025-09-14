
import { Prisma } from "../../../generated/prisma";
import prisma from "../../prisma";

class ProductService {


    async fetchProduct(filter: Prisma.ProductWhereInput) {
        return await prisma.product.findMany({
            where: filter,
            include: { variants: true, brand: true, type: true, region: true, availability: true, simType: true, category: true },
        })
    }


    // async createProduct(product: Product): Promise<Product> {
    //     return await prisma.product.create({
    //         data: product
    //     })
    // }
}


export interface ProductSearchFilters {
    name?: string;           // Filter by category
    model?: string;           // Filter by category
    categoryId?: string;           // Filter by category
    brandId?: string;              // Filter by brand
    minPrice?: number;             // Minimum price filter
    maxPrice?: number;             // Maximum price filter
    inStock?: boolean;             // Availability filter
    rating?: number;               // Minimum rating filter (1-5)
    tags?: string[];               // Tags or keywords filter
}


export default new ProductService