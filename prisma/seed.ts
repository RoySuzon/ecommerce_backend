import prisma from "../src/prisma";


async function main() {
    console.log('🌱 Seeding database with integer IDs...');

    // --- Brand ---
    const apple = await prisma.brand.create({
        data: {
            name: "Apple",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/960px-Samsung_Logo.svg.png"
        }
    });

    const samsung = await prisma.brand.create({
        data: {
            name: "Samsung",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png"
        }
    });

    // --- Category ---
    const mobile = await prisma.category.create({
        data: { name: "Mobile" }
    });

    const laptop = await prisma.category.create({
        data: { name: "Laptop" }
    });

    // --- Availability ---
    const inStock = await prisma.availability.create({
        data: { status: "In Stock" }
    });

    const preOrder = await prisma.availability.create({
        data: { status: "Pre-order" }
    });

    // --- Product: iPhone 15 Pro Max ---
    const iphone15ProMax = await prisma.product.create({
        data: {
            name: "iPhone 15 Pro Max",
            model: "Pro Max",
            description: "The latest iPhone 15 Pro Max with A17 Bionic chip and Titanium body.",
            deliveryTimescale: "2-3 Days",
            specifications: {
                Display: "6.7-inch OLED",
                Battery: "4500mAh",
                Processor: "A17 Pro",
            },
            brandId: apple.id,
            categoryId: mobile.id,
            availabilityId: inStock.id,
        }
    });

    // --- Variants for iPhone 15 Pro Max ---
    await prisma.productVariant.createMany({
        data: [
            {
                productId: iphone15ProMax.id,
                productCode: "IPHONE-16-PRO-MAX-BLUE-01",
                color: "Blue",
                storage: "256GB",
                ram: "8GB",
                regularPrice: 170000,
                discountPrice: 160000,
                stockQty: 10,
                images: [
                    "https://example.com/iphone15-blue-front.jpg",
                    "https://example.com/iphone15-blue-back.jpg"
                ]
            },
            {
                productId: iphone15ProMax.id,
                productCode: 'IPHONE-16-PRO-MAX-BLACK-01',
                color: "Black",
                storage: "512GB",
                ram: "8GB",
                regularPrice: 190000,
                discountPrice: 180000,
                stockQty: 5,
                images: [
                    "https://example.com/iphone15-black-front.jpg",
                    "https://example.com/iphone15-black-back.jpg"
                ]
            }
        ]
    });

    // --- Specification Table (extra structured specs) ---
    await prisma.specification.createMany({
        data: [
            {
                productId: iphone15ProMax.id,
                key: "Camera",
                value: "48MP + 12MP Ultra Wide"
            },
            {
                productId: iphone15ProMax.id,
                key: "OS",
                value: "iOS 17"
            }
        ]
    });

    // --- Another Product: Samsung Galaxy S24 Ultra ---
    const galaxyS24Ultra = await prisma.product.create({
        data: {
            name: "Samsung Galaxy S24 Ultra",
            model: "Ultra",
            description: "Samsung’s flagship Galaxy S24 Ultra with Snapdragon 8 Gen 3.",
            deliveryTimescale: "3-5 Days",
            specifications: {
                Display: "6.8-inch AMOLED",
                Battery: "5000mAh",
                Processor: "Snapdragon 8 Gen 3",
            },
            brandId: samsung.id,
            categoryId: mobile.id,
            availabilityId: preOrder.id,
        }
    });

    await prisma.productVariant.createMany({
        data: [
            {
                productId: galaxyS24Ultra.id,
                productCode: 'SAMSUNG-S24-ULTRA-GRAY-01',
                color: "Gray",
                storage: "256GB",
                ram: "12GB",
                regularPrice: 180000,
                discountPrice: 170000,
                stockQty: 15,
                images: [
                    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-0.jpg",
                    "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FGalaxy-S24-Ultra-Titanium-Gray-8816.jpg&w=2048&q=100"
                ]
            },
            {
                productId: galaxyS24Ultra.id,
                productCode: 'SAMSUNG-S24-ULTRA-WHITE-01',
                color: "White",
                storage: "512GB",
                ram: "12GB",
                regularPrice: 200000,
                discountPrice: 190000,
                stockQty: 7,
                images: [
                    "https://example.com/galaxyS24-white-front.jpg",
                    "https://example.com/galaxyS24-white-back.jpg"
                ]
            }
        ]
    });

    await prisma.specification.createMany({
        data: [
            {
                productId: galaxyS24Ultra.id,
                key: "Camera",
                value: "200MP + 12MP Ultra Wide + 10MP Telephoto"
            },
            {
                productId: galaxyS24Ultra.id,
                key: "OS",
                value: "Android 14 (One UI 6)"
            }
        ]
    });

    const ramType = await prisma.specificationsType.create({
        data: {
            name: "RAM",
            AllSpecifications: {
                create: [
                    { value: "4 GB" },
                    { value: "8 GB" },
                    { value: "16 GB" },
                    { value: "32 GB" },
                ],
            },
        },
        include: { AllSpecifications: true },
    });

    // Storage
    const storageType = await prisma.specificationsType.create({
        data: {
            name: "Storage",
            AllSpecifications: {
                create: [
                    { value: "64 GB" },
                    { value: "128 GB" },
                    { value: "256 GB" },
                    { value: "512 GB" },
                    { value: "1 TB" },
                ],
            },
        },
        include: { AllSpecifications: true },
    });

    // Processor
    const processorType = await prisma.specificationsType.create({
        data: {
            name: "Processor",
            AllSpecifications: {
                create: [
                    { value: "Intel i5" },
                    { value: "Intel i7" },
                    { value: "Intel i9" },
                    { value: "Apple M1" },
                    { value: "Apple M2" },
                    { value: "AMD Ryzen 7" },
                ],
            },
        },
        include: { AllSpecifications: true },
    });

    // Display
    const displayType = await prisma.specificationsType.create({
        data: {
            name: "Display",
            AllSpecifications: {
                create: [
                    { value: "13 inch FHD" },
                    { value: "15 inch FHD" },
                    { value: "14 inch 2K" },
                    { value: "16 inch 4K" },
                ],
            },
        },
        include: { AllSpecifications: true },
    });

    // Battery
    const batteryType = await prisma.specificationsType.create({
        data: {
            name: "Battery",
            AllSpecifications: {
                create: [
                    { value: "4000 mAh" },
                    { value: "5000 mAh" },
                    { value: "6000 mAh" },
                ],
            },
        },
        include: { AllSpecifications: true },
    });

    console.log("✅ Database seeded successfully with demo products!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
