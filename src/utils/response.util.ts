import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: any;
  errors?: any;
}

export class ResponseUtil {
  static success<T>(res: Response, message: string, data?: T, meta?: any, statusCode = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      ...(data !== undefined && { data }),
      ...(meta !== undefined && { meta }),
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, statusCode = 400, errors?: any): Response {
    const response: ApiResponse = {
      success: false,
      message,
      ...(errors !== undefined && { errors }),
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, message: string, data?: T): Response {
    return this.success(res, message, data, undefined, 201);
  }

  static unauthorized(res: Response, message = 'Unauthorized access'): Response {
    return this.error(res, message, 401);
  }

  static forbidden(res: Response, message = 'Forbidden resource access'): Response {
    return this.error(res, message, 403);
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }
}
