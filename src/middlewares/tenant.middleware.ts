import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // If user is authenticated, tenantId is set from auth.middleware.ts token context.
  // Can also fall back to header X-Tenant-ID for pre-auth tenant resolution.
  const tenantIdHeader = req.headers['x-tenant-id'] as string;

  if (req.user?.companyId) {
    req.tenantId = req.user.companyId;
  } else if (tenantIdHeader) {
    req.tenantId = tenantIdHeader;
  }

  next();
};
