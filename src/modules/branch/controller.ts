import { Request, Response, NextFunction } from 'express';
import { BranchService } from './service';
import { BranchValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { BRANCH_MESSAGES } from './constants';

export class BranchController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) {
        return ResponseUtil.unauthorized(res, 'Tenant context is missing');
      }

      const filters = BranchValidator.validateQuery(req.query);
      const result = await BranchService.getBranches({ ...filters, companyId });
      return ResponseUtil.success(
        res,
        BRANCH_MESSAGES.FETCHED,
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
      const branch = await BranchService.getBranchById(companyId, id);
      return ResponseUtil.success(res, BRANCH_MESSAGES.FETCHED_ONE, branch);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const validated = BranchValidator.validateCreate(req.body);
      const branch = await BranchService.createBranch({ ...validated, companyId });
      return ResponseUtil.created(res, BRANCH_MESSAGES.CREATED, branch);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = BranchValidator.validateUpdate(req.body);
      const branch = await BranchService.updateBranch(companyId, id, validated);
      return ResponseUtil.success(res, BRANCH_MESSAGES.UPDATED, branch);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.tenantId || req.user?.companyId;
      if (!companyId) return ResponseUtil.unauthorized(res);

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await BranchService.deleteBranch(companyId, id);
      return ResponseUtil.success(res, BRANCH_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
