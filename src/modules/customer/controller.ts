import { Request, Response, NextFunction } from 'express';
import { CustomerService } from './service';
import { CustomerValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { CUSTOMER_MESSAGES } from './constants';

export class CustomerController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) {
        return ResponseUtil.unauthorized(res, 'Tenant context is missing');
      }

      const filters = CustomerValidator.validateQuery(req.query);
      const result = await CustomerService.getCustomers({ ...filters, companyId });
      return ResponseUtil.success(
        res,
        CUSTOMER_MESSAGES.FETCHED,
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
      const customer = await CustomerService.getCustomerById(companyId, id);
      return ResponseUtil.success(res, CUSTOMER_MESSAGES.FETCHED_ONE, customer);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const validated = CustomerValidator.validateCreate(req.body);
      const customer = await CustomerService.createCustomer({ ...validated, companyId });
      return ResponseUtil.created(res, CUSTOMER_MESSAGES.CREATED, customer);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = CustomerValidator.validateUpdate(req.body);
      const customer = await CustomerService.updateCustomer(companyId, id, validated);
      return ResponseUtil.success(res, CUSTOMER_MESSAGES.UPDATED, customer);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await CustomerService.deleteCustomer(companyId, id);
      return ResponseUtil.success(res, CUSTOMER_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
