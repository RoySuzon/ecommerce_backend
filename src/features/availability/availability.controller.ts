import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import availabilityService from "./availability.service";

class AvailabilityController {
  // Get Availability records
  async getAvailability(req: Request, res: Response) {
    const filter: Prisma.AvailabilityWhereInput = {
      ...(req.query.status && {
        status: { contains: req.query.status as string, mode: "insensitive" },
      }),
      ...(req.query.id && !isNaN(Number(req.query.id)) && {
        id: Number(req.query.id),
      }),
    };

    try {
      const data = await availabilityService.fetchAvailability(filter);
      return res.success({ data });
    } catch (error: any) {
      return res.error({ message: error.message, errors: error });
    }
  }

  // Add single Availability
  async addAvailability(req: Request, res: Response) {
    try {
      const { status } = req.body;

      if (!status) return res.error({ message: "Status is required", statusCode: 400 });

      const data = await availabilityService.insertAvailability({ status });

      return res.success({ data, statusCode: 201 });
    } catch (error: any) {
      return res.error({ message: "Internal server error", errors: error });
    }
  }

  // Add multiple Availability records
  async addManyAvailability(req: Request, res: Response) {
    try {
      const availabilities = req.body.availabilities;

      if (!Array.isArray(availabilities) || availabilities.length === 0) {
        return res.error({ message: "Availabilities array is required", statusCode: 400 });
      }

      const data = await availabilityService.insertManyAvailability(availabilities);

      return res.success({ data, statusCode: 201 });
    } catch (error: any) {
      return res.error({ message: "Internal server error", errors: error });
    }
  }

  // Update Availability
  async updateAvailability(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) return res.error({ message: "Invalid availability id", statusCode: 400 });
      if (!status) return res.error({ message: "Status is required to update", statusCode: 400 });

      const updatedAvailability = await availabilityService.updateAvailability(id, { status });

      return res.success({ data: updatedAvailability, statusCode: 200 });
    } catch (error: any) {
      return res.error({ message: "Internal server error", errors: error });
    }
  }
}

export default new AvailabilityController();
