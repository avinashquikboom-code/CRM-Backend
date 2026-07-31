import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './service';
import { DepartmentValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { DEPARTMENT_MESSAGES } from './constants';

export class DepartmentController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) {
        return ResponseUtil.unauthorized(res, 'Tenant context is missing');
      }

      const filters = DepartmentValidator.validateQuery(req.query);
      const result = await DepartmentService.getDepartments({ ...filters, companyId });
      return ResponseUtil.success(
        res,
        DEPARTMENT_MESSAGES.FETCHED,
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
      const department = await DepartmentService.getDepartmentById(companyId, id);
      return ResponseUtil.success(res, DEPARTMENT_MESSAGES.FETCHED_ONE, department);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const validated = DepartmentValidator.validateCreate(req.body);
      const department = await DepartmentService.createDepartment({ ...validated, companyId });
      return ResponseUtil.created(res, DEPARTMENT_MESSAGES.CREATED, department);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = DepartmentValidator.validateUpdate(req.body);
      const department = await DepartmentService.updateDepartment(companyId, id, validated);
      return ResponseUtil.success(res, DEPARTMENT_MESSAGES.UPDATED, department);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await DepartmentService.deleteDepartment(companyId, id);
      return ResponseUtil.success(res, DEPARTMENT_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
