// middlewares/apiResponse.ts
import { NextFunction, Request, Response } from "express";

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
    statusCode: number;
    timestamp: string;
}

type SuccessParams<T> = {
    data: T;
    message?: string;
    statusCode?: number;
};

type ErrorParams = {
    message?: string;
    errors?: string[];
    statusCode?: number;
};

// Middleware to attach helpers
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
    res.success = function <T>({ data, message = "Request successful", statusCode = 200 }: SuccessParams<T>) {
        const response: ApiResponse<T> = {
            success: true,
            message,
            data,
            statusCode,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };

    res.error = function ({ message = "Request failed", errors = [], statusCode = 400 }: ErrorParams) {
        const response: ApiResponse<null> = {
            success: false,
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
