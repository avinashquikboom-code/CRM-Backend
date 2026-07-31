import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseUtil } from '../utils/response.util';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);

  if (err instanceof ZodError) {
    return ResponseUtil.error(
      res,
      'Validation Error',
      400,
      err.issues.map((e) => ({ field: e.path.join('.'), message: e.message }))
    );
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ResponseUtil.error(res, message, statusCode);
};
