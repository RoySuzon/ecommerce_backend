import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import UserService from "./user.service";

class UserController {
    async add(req: Request, res: Response) {
        //  #swagger.tags = ['User']

        const { email } = req.body;

        const data: Prisma.UserCreateInput = {

            email: email as string,
            password: req.body.password as string,
            userId: email as string,
            firstName: req.body.firstName,
            lastName: req.body.lastName,


        }
        try {
            const result = await UserService.insert(data);
            return res.success({ data: result, message: "", statusCode: 201 });

        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async addMany(req: Request, res: Response) {
        //  #swagger.tags = ['User']
        try {
            const result = await UserService.insertMany();
            return res.success({ data: result, message: "" });

        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        //  #swagger.tags = ['User']
        try {
            const result = await UserService.update();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        //  #swagger.tags = ['User']
        try {
            const result = await UserService.delete();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
        //  #swagger.tags = ['User']
        const where: Prisma.UserWhereInput = {

        }
        try {
            const result = await UserService.fetch(where);
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
}

export default new UserController();
