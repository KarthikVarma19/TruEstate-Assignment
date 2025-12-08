import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { ApiResponse } from "../utils/apiResponse";

export const errorHandler = (err: { statusCode: number; message: string; errors: any }, _req: ExpressRequest, res: ExpressResponse, _next: any) => {
  console.error("Error:", err);
  return ApiResponse(res, err.statusCode || 500, false, err.message || "Internal Server Error", null, err.errors || []);
};