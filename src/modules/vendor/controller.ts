import { Request, Response, NextFunction } from 'express';
import { VendorService } from './service';
import { VendorValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { VENDOR_MESSAGES } from './constants';

export class VendorController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) {
        return ResponseUtil.unauthorized(res, 'Tenant context is missing');
      }

      const filters = VendorValidator.validateQuery(req.query);
      const result = await VendorService.getVendors({ ...filters, companyId });
      return ResponseUtil.success(
        res,
        VENDOR_MESSAGES.FETCHED,
        result.items,
        {
          page: result.page,
          pageSize: result.pageSize,
          total: result.total,
          totalPages: result.totalPages,
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const vendor = await VendorService.getVendorById(companyId, id);
      return ResponseUtil.success(res, VENDOR_MESSAGES.FETCHED_ONE, vendor);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const validated = VendorValidator.validateCreate(req.body);
      const vendor = await VendorService.createVendor({ ...validated, companyId });
      return ResponseUtil.created(res, VENDOR_MESSAGES.CREATED, vendor);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = VendorValidator.validateUpdate(req.body);
      const vendor = await VendorService.updateVendor(companyId, id, validated);
      return ResponseUtil.success(res, VENDOR_MESSAGES.UPDATED, vendor);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await VendorService.deleteVendor(companyId, id);
      return ResponseUtil.success(res, VENDOR_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
