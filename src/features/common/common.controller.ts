import { Request, Response } from "express";
import commonService from "./common.service";

class CommonController {
    async dropdown(req: Request, res: Response) {
        //  #swagger.tags = ['Common']
        try {
            const { type } = req.query;
            const { name = '' } = req.query;
            const { limit } = req.query;

            let take: any | null = !isNaN(Number(limit)) ? Number(limit) : undefined;


            // switch (type) {
            //     case TypeName.BRAND:

            //         break;
            //     case TypeName.CATEGORY:

            //         break;

            //     default:
            //         break;
            // }

            switch ((type as string).toLocaleLowerCase()) {
                case TypeName.BRAND:
                    return res.success({
                        data: await commonService.getBrands(name as string, take),
                        message: "Brands fetched successfully",
                    });

                case TypeName.CATEGORY:
                    return res.success({
                        data: await commonService.getCategories(name as string, take),
                        message: "Categories fetched successfully",
                    });

                case "availability":
                    const data = await commonService.getAvailabilityByValue(name as string)
                    return res.success({
                        data: data?.map((e) => ({ name: e })),
                        message: "Availabilities fetched successfully",
                    });
                case "specificationtype":
                    return res.success({
                        data: await commonService.getSpecificationTypes(name as string, take),
                        message: "specificationType fetched successfully",
                    });

                default:
                    return res.error({
                        message: "Invalid dropdown type",
                        statusCode: 400,
                    });
            }
        } catch (error: any) {
            return res.error({
                message: "Internal server error",
                errors: error.message,
                statusCode: 500,
            });
        }
    }


}


enum TypeName {
    BRAND = 'brand',
    CATEGORY = 'category'
}

export default new CommonController();
