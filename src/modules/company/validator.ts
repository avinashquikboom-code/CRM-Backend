import { createCompanySchema, updateCompanySchema, companyQuerySchema } from './dto';

export class CompanyValidator {
  static validateCreate(data: any) {
    return createCompanySchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateCompanySchema.parse(data);
  }

  static validateQuery(query: any) {
    return companyQuerySchema.parse(query);
  }
}
