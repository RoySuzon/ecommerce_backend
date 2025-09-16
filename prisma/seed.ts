import { AvailabilityStatus, Prisma, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    console.log("⏳ Start seeding manual devices...");

    // Clean tables
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
    const brandsData: Prisma.BrandCreateInput[] = [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "OnePlus" },
    ];
    await prisma.brand.createMany({ data: brandsData, skipDuplicates: true });
    const brands = await prisma.brand.findMany();

    // Categories
    const categoriesData = ["Smartphone", "Tablet", "Laptop"];
    await prisma.category.createMany({ data: categoriesData.map((name) => ({ name })), skipDuplicates: true });
    const categories = await prisma.category.findMany();

    // Specification Types
    const specTypesData = ["RAM", "Storage", "Color", "Processor", "Display"];
    await prisma.specificationsType.createMany({ data: specTypesData.map((name) => ({ name })), skipDuplicates: true });
    const specTypes = await prisma.specificationsType.findMany();

    // AllSpecifications (manual)
    const allSpecsData = [
        // RAM
        { value: "4GB", typeId: specTypes.find((t) => t.name === "RAM")!.id },
        { value: "8GB", typeId: specTypes.find((t) => t.name === "RAM")!.id },
        // Storage
        { value: "64GB", typeId: specTypes.find((t) => t.name === "Storage")!.id },
        { value: "128GB", typeId: specTypes.find((t) => t.name === "Storage")!.id },
        // Color
        { value: "Black", typeId: specTypes.find((t) => t.name === "Color")!.id },
        { value: "White", typeId: specTypes.find((t) => t.name === "Color")!.id },
        // Processor
        { value: "Snapdragon 888", typeId: specTypes.find((t) => t.name === "Processor")!.id },
        { value: "Apple A15", typeId: specTypes.find((t) => t.name === "Processor")!.id },
        // Display
        { value: "6.1 inch", typeId: specTypes.find((t) => t.name === "Display")!.id },
        { value: "6.7 inch", typeId: specTypes.find((t) => t.name === "Display")!.id },
    ];

    await prisma.allSpecifications.createMany({ data: allSpecsData, skipDuplicates: true });
    const allSpecs = await prisma.allSpecifications.findMany();

    // Helper maps
    const ramMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "RAM")!.id);
    const storageMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "Storage")!.id);
    const colorMap = allSpecs.filter((s) => s.typeId === specTypes.find((t) => t.name === "Color")!.id);

    // Manual products
    const devices = [
        {
            brand: "Apple",
            category: "Smartphone",
            name: "iPhone 13",
            model: "iPhone-13",
            deliveryTimescale: "3-5 days",
            availability: "IN_STOCK",
        },
        {
            brand: "Samsung",
            category: "Smartphone",
            name: "Galaxy S21",
            model: "Galaxy-S21",
            deliveryTimescale: "2-4 days",
            availability: "IN_STOCK",
        },
        {
            brand: "OnePlus",
            category: "Smartphone",
            name: "OnePlus 10",
            model: "OnePlus-10",
            deliveryTimescale: "3-6 days",
            availability: "IN_STOCK",
        },
    ];

    let productCount = 0;

    for (const device of devices) {
        const brand = brands.find((b) => b.name === device.brand)!;
        const category = categories.find((c) => c.name === device.category)!;
        const availabilityValues = Object.values(AvailabilityStatus);

        // Function to get a random enum value
        function getRandomAvailability(): AvailabilityStatus {
            const randomIndex = Math.floor(Math.random() * availabilityValues.length);
            return availabilityValues[randomIndex] as AvailabilityStatus;
        }

        // Example usage:
        const randomStatus = getRandomAvailability();
        const product = await prisma.product.create({
            data: {
                name: device.name,
                model: device.model,
                description: `Description of ${device.name}`,
                deliveryTimescale: device.deliveryTimescale,
                brandId: brand.id,
                categoryId: category.id,
                availability: getRandomAvailability()
            },
        });

        // Create one variant per combination (RAM × Storage × Color)
        for (const ram of ramMap) {
            for (const storage of storageMap) {
                for (const color of colorMap) {
                    const variantCode = `${device.name}-${ram.value}-${storage.value}-${color.value}`.replace(/\s+/g, "");
                    const basePrice = 500;
                    const ramPrice = parseInt(ram.value) * 10;
                    const storagePrice = parseInt(storage.value) || 0;
                    const price = basePrice + ramPrice + storagePrice;

                    const variant = await prisma.productVariant.create({
                        data: {
                            productCode: variantCode,
                            regularPrice: price,
                            discountPrice: price - 50,
                            stockQty: 50,
                            productId: product.id,
                            images: {
                                create: [{ url: `https://dummyimage.com/400x400/${color.value.toLowerCase()}`, altText: color.value }],
                            },
                        },
                    });

                    await prisma.productVariantSpecification.createMany({
                        data: [
                            { variantId: variant.id, specificationId: ram.id },
                            { variantId: variant.id, specificationId: storage.id },
                            { variantId: variant.id, specificationId: color.id },
                        ],
                    });

                    await prisma.productSpecification.createMany({
                        data: [
                            { productId: product.id, specificationId: ram.id },
                            { productId: product.id, specificationId: storage.id },
                            { productId: product.id, specificationId: color.id },
                        ],
                        skipDuplicates: true,
                    });
                }
            }
        }

        productCount++;
        console.log(`✅ Created product ${productCount}: ${device.name}`);
    }

    console.log("🎉 Seed completed with manual devices!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
