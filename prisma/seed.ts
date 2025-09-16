import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    console.log("⏳ Start seeding large dataset...");

    // Clean all tables
    await prisma.productVariantSpecification.deleteMany();
    await prisma.productSpecification.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.allSpecifications.deleteMany();
    await prisma.specificationsType.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();

    // Brands
    const brandsData = [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "OnePlus" },
        { name: "Xiaomi" },
        { name: "Dell" },
    ];
    await prisma.brand.createMany({ data: brandsData, skipDuplicates: true });
    const brands = await prisma.brand.findMany();

    // Categories
    const categoriesData = ["Smartphone", "Tablet", "Laptop", "Accessories"];
    await prisma.category.createMany({ data: categoriesData.map((name) => ({ name })), skipDuplicates: true });
    const categories = await prisma.category.findMany();

    // Specification Types
    const specTypesData = ["RAM", "Storage", "Color", "Processor", "Display"];
    await prisma.specificationsType.createMany({ data: specTypesData.map((name) => ({ name })), skipDuplicates: true });
    const specTypes = await prisma.specificationsType.findMany();

    // AllSpecifications
    const ramSpec = ["4GB", "6GB", "8GB", "12GB", "16GB"];
    const storageSpec = ["64GB", "128GB", "256GB", "512GB", "1TB"];
    const colorSpec = ["Black", "White", "Red", "Blue", "Green"];
    const processorSpec = ["Snapdragon 888", "Apple A15", "Intel i5", "Intel i7", "AMD Ryzen 5"];
    const displaySpec = ["6.1 inch", "6.7 inch", "12 inch", "13 inch", "15 inch"];

    const allSpecsData = [
        ...ramSpec.map((v) => ({ value: v, typeId: specTypes.find((t) => t.name === "RAM")!.id })),
        ...storageSpec.map((v) => ({ value: v, typeId: specTypes.find((t) => t.name === "Storage")!.id })),
        ...colorSpec.map((v) => ({ value: v, typeId: specTypes.find((t) => t.name === "Color")!.id })),
        ...processorSpec.map((v) => ({ value: v, typeId: specTypes.find((t) => t.name === "Processor")!.id })),
        ...displaySpec.map((v) => ({ value: v, typeId: specTypes.find((t) => t.name === "Display")!.id })),
    ];

    await prisma.allSpecifications.createMany({ data: allSpecsData, skipDuplicates: true });
    const allSpecs = await prisma.allSpecifications.findMany();

    // Helper maps
    const ramMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "RAM")!.id);
    const storageMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "Storage")!.id);
    const colorMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "Color")!.id);

    // ------------------------
    // Create >1000 products with variants
    // ------------------------
    let productCount = 0;

    for (const category of categories) {
        for (let b = 0; b < brands.length; b++) {
            for (let i = 1; i <= 50; i++) { // 50 products per brand/category → 50×5×4 ≈ 1000+
                const productName = `${brands[b].name} ${category.name} Model ${i}`;
                const product = await prisma.product.create({
                    data: {
                        name: productName,
                        model: `Model-${i}`,
                        description: `Description of ${productName}`,
                        deliveryTimescale: "3-5 days",
                        brandId: brands[b].id,
                        categoryId: category.id,
                        availability: "IN_STOCK",
                    },
                });

                // Add ProductVariants: RAM × Storage × Color → 5×5×5 = 125 variants per product
                for (const ram of ramMap) {
                    for (const storage of storageMap) {
                        for (const color of colorMap) {
                            const variantCode = `${productName}-${ram.value}-${storage.value}-${color.value}`.replace(/\s+/g, "");
                            const basePrice = 500;
                            const ramPrice = parseInt(ram.value) * 10; // 4GB→40
                            const storagePrice = parseInt(storage.value) || 0; // 128GB→128
                            const price = basePrice + ramPrice + storagePrice;

                            const variant = await prisma.productVariant.create({
                                data: {
                                    productCode: variantCode,
                                    regularPrice: price,
                                    discountPrice: price - 50,
                                    stockQty: 100,
                                    productId: product.id,
                                    images: {
                                        create: [
                                            { url: `https://dummyimage.com/400x400/${color.value.toLowerCase()}`, altText: color.value },
                                        ],
                                    },
                                },
                            });

                            // Link ProductVariantSpecifications
                            await prisma.productVariantSpecification.createMany({
                                data: [
                                    { variantId: variant.id, specificationId: ram.id },
                                    { variantId: variant.id, specificationId: storage.id },
                                    { variantId: variant.id, specificationId: color.id },
                                ],
                            });

                            // Link ProductSpecifications (once per product)
                            const exists = await prisma.productSpecification.findFirst({
                                where: { productId: product.id, specificationId: ram.id },
                            });
                            if (!exists) {
                                await prisma.productSpecification.createMany({
                                    data: [
                                        { productId: product.id, specificationId: ram.id },
                                        { productId: product.id, specificationId: storage.id },
                                        { productId: product.id, specificationId: color.id },
                                    ],
                                });
                            }
                        }
                    }
                }
                productCount++;
                console.log(`Created product ${productCount}: ${productName}`);
            }
        }
    }

    console.log("✅ Seed completed with 1000+ products, variants, and specifications!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
