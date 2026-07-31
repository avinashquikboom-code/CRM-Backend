import { Request, Response, NextFunction } from 'express';
import { CompanyService } from './service';
import { CompanyValidator } from './validator';
import { ResponseUtil } from '../../utils/response.util';
import { COMPANY_MESSAGES } from './constants';

export class CompanyController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = CompanyValidator.validateQuery(req.query);
      const result = await CompanyService.getCompanies(filters);
      return ResponseUtil.success(
        res,
        COMPANY_MESSAGES.FETCHED,
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
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const company = await CompanyService.getCompanyById(id);
      return ResponseUtil.success(res, COMPANY_MESSAGES.FETCHED_ONE, company);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CompanyValidator.validateCreate(req.body);
      const company = await CompanyService.createCompany(validated);
      return ResponseUtil.created(res, COMPANY_MESSAGES.CREATED, company);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const validated = CompanyValidator.validateUpdate(req.body);
      const company = await CompanyService.updateCompany(id, validated);
      return ResponseUtil.success(res, COMPANY_MESSAGES.UPDATED, company);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await CompanyService.deleteCompany(id);
      return ResponseUtil.success(res, COMPANY_MESSAGES.DELETED);
    } catch (error) {
      next(error);
    }
  }
}
