import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseUtil } from '../utils/response.util';

export interface AuthUser {
  id: string;
  email: string;
  companyId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      tenantId?: string;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ResponseUtil.unauthorized(res, 'Access token is required');
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production';
    const decoded = jwt.verify(token, jwtSecret) as AuthUser;

    req.user = decoded;
    req.tenantId = decoded.companyId;

    next();
  } catch (error) {
    return ResponseUtil.unauthorized(res, 'Invalid or expired token');
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }
    if (!roles.includes(req.user.role)) {
      return ResponseUtil.forbidden(res, 'You do not have permission to perform this action');
    }
    next();
  };
};
