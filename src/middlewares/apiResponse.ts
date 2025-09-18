// middlewares/apiResponse.ts
import { NextFunction, Request, Response } from "express";

export interface ApiResponse<T = any> {
    success: boolean;
    status: "success" | "fail" | "unauthorized" | "authorized";
    message?: string;
    statusCode: number;
    data?: T;
    errors?: any;
    timestamp: string;
}

type SuccessParams<T> = {
    data: T;
    message?: string;
    statusCode?: number;
    status?: "success" | "authorized"; // optional override
};

type ErrorParams = {
    message?: string;
    errors?: any;
    statusCode?: number;
    status?: "fail" | "unauthorized"; // optional override
};

// Middleware to attach helpers
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
    res.success = function <T>({
        data,
        message = "Request successful",
        statusCode = 200,
        status = "success",
    }: SuccessParams<T>) {
        const response: ApiResponse<T> = {
            success: true,
            status,
            message,
            statusCode,
            data,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };

    res.error = function ({
        message = "Request failed",
        errors,
        statusCode = 400,
        status = "fail",
    }: ErrorParams) {
        const response: ApiResponse<null> = {
            success: false,
            status,
            message,
            errors,
            statusCode,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };

    next();
}

// Extend Express Response type globally
declare global {
    namespace Express {
        interface Response {
            success<T>(params: SuccessParams<T>): Response;
            error(params: ErrorParams): Response;
        }
    }
}
