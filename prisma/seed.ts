import prisma from "../src/prisma";

async function main() {
    console.log('Start seeding...');

    // 1. Clear existing data to avoid conflicts
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.brand.deleteMany({});
    await prisma.productType.deleteMany({});
    await prisma.region.deleteMany({});
    await prisma.availability.deleteMany({});
    await prisma.simType.deleteMany({});

    // 2. Create foundational data first (tables with no foreign keys)
    const mobilePhoneCategory = await prisma.category.create({
        data: { name: 'Mobile Phone' },
    });

    const motorolaBrand = await prisma.brand.create({
        data: { name: 'Motorola' },
    });

    const appleBrand = await prisma.brand.create({
        data: { name: 'Apple' },
    });

    const exynosType = await prisma.productType.create({
        data: { name: 'Exynos 5G' },
    });

    const snapdragonType = await prisma.productType.create({
        data: { name: 'Snapdragon 5G' },
    });

    const officialRegion = await prisma.region.create({
        data: { name: 'BD-Official' },
    });

    const inStockAvailability = await prisma.availability.create({
        data: { status: 'In Stock' },
    });

    const dualSim = await prisma.simType.create({
        data: { type: 'Dual' },
    });

    const singleSim = await prisma.simType.create({
        data: { type: 'Single' },
    });

    // 3. Create products and link them to the foundational data
    const motorolaProduct = await prisma.product.create({
        data: {
            name: 'Motorola Edge 60 Fusion 5G',
            model: 'Edge 60 Fusion 5G',
            productCode: 'AGL29317',
            description: '161 x 73 x 8.0 mm | IP68/IP69 dust/water resistant (high-pressure water jets; immersible up to 1.5m for 30 min) | Corning Gorilla Glass 7i | Glass front (Gorilla Glass 7i), silicone polymer back (eco leather)',
            deliveryTimescale: '3-5 Days',
            specifications: {
                network: 'GSM / HSPA / LTE / 5G',
                dimensions: '161 x 73 x 8.0 mm',
                display: '6.7 inches, 1B colors, 120Hz',
                os: 'Android 14',
            },
            brandId: motorolaBrand.id,
            categoryId: mobilePhoneCategory.id,
            typeId: snapdragonType.id,
            regionId: officialRegion.id,
            availabilityId: inStockAvailability.id,
            simTypeId: dualSim.id,
        },
    });

    const iphone15Product = await prisma.product.create({
        data: {
            name: 'iPhone 16 Pro Max',
            model: '16 Pro Max',
            productCode: 'IPH-16-PRO-MAX',
            description: 'Experience the ultimate in mobile technology with the iPhone 16 Pro Max.',
            deliveryTimescale: '3-5 Days',
            specifications: {
                network: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
                dimensions: '160.7 x 77.6 x 7.9 mm',
                display: '6.7 inches, 120Hz ProMotion',
                os: 'iOS 18',
            },
            brandId: appleBrand.id,
            categoryId: mobilePhoneCategory.id,
            typeId: exynosType.id,
            regionId: officialRegion.id,
            availabilityId: inStockAvailability.id,
            simTypeId: singleSim.id,
        },
    });

    // 4. Create variants for each product
    await prisma.productVariant.createMany({
        data: [
            {
                color: 'Amazonite',
                storage: '8/256GB',
                regularPrice: 32200,
                salePrice: 28980,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: motorolaProduct.id,
            },
            {
                color: 'Mykonos Blue',
                storage: '12/256GB',
                regularPrice: 38000,
                salePrice: 32300,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: motorolaProduct.id,
            },
            {
                color: 'Slipstream',
                storage: '12/512GB',
                regularPrice: 40000,
                salePrice: 34000,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: motorolaProduct.id,
            },
            {
                color: 'Zephyr',
                storage: '12/512GB',
                regularPrice: 42000,
                salePrice: 35700,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: motorolaProduct.id,
            },
            {
                color: 'Titanium Black',
                storage: '12/256GB',
                regularPrice: 152000,
                salePrice: 144400,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: iphone15Product.id,
            },
            {
                color: 'Titanium Blue',
                storage: '12/512GB',
                regularPrice: 165000,
                salePrice: 156750,
                images: ['https://placehold.co/400x400', 'https://placehold.co/400x400'],
                productId: iphone15Product.id,
            },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
