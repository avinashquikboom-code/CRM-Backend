import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from './service';
import { EmployeeValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { EMPLOYEE_MESSAGES } from './constants';

export class EmployeeController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) {
        return ResponseUtil.unauthorized(res, 'Tenant context is missing');
      }

      const filters = EmployeeValidator.validateQuery(req.query);
      const result = await EmployeeService.getEmployees({ ...filters, companyId });
      return ResponseUtil.success(
        res,
        EMPLOYEE_MESSAGES.FETCHED,
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
      const employee = await EmployeeService.getEmployeeById(companyId, id);
      return ResponseUtil.success(res, EMPLOYEE_MESSAGES.FETCHED_ONE, employee);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const validated = EmployeeValidator.validateCreate(req.body);
      const employee = await EmployeeService.createEmployee({ ...validated, companyId });
      return ResponseUtil.created(res, EMPLOYEE_MESSAGES.CREATED, employee);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = EmployeeValidator.validateUpdate(req.body);
      const employee = await EmployeeService.updateEmployee(companyId, id, validated);
      return ResponseUtil.success(res, EMPLOYEE_MESSAGES.UPDATED, employee);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await EmployeeService.deleteEmployee(companyId, id);
      return ResponseUtil.success(res, EMPLOYEE_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
