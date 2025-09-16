import { Request, Response } from "express";
import commonService from "./common.service";

class CommonController {
    async dropdown(req: Request, res: Response) {
        try {
            const { type } = req.query;

            switch (type) {
                case "brand":
                    return res.success({
                        data: await commonService.getBrands(),
                        message: "Brands fetched successfully",
                    });

                case "category":
                    return res.success({
                        data: await commonService.getCategories(),
                        message: "Categories fetched successfully",
                    });

                case "availability":
                    return res.success({
                        data: await commonService.getAvailabilities(),
                        message: "Availabilities fetched successfully",
                    });
                case "specificationType":
                    return res.success({
                        data: await commonService.getSpecificationTypes(),
                        message: "Availabilities fetched successfully",
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

export default new CommonController();
