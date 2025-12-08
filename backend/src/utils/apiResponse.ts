import { Response as ExpressResponse } from "express";

export const ApiResponse = (res: ExpressResponse, statusCode: number, success: boolean, message: string, data: any | null = null, errors: any = []) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    errors,
    timestamp: new Date().toISOString(),
  });
};