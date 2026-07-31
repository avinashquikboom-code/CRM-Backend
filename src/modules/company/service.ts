import { CompanyRepository } from './repository';
import { CreateCompanyInput, UpdateCompanyInput, CompanyQueryFilters } from './types';
import { COMPANY_MESSAGES } from './constants';

export class CompanyService {
  static async getCompanies(filters: CompanyQueryFilters) {
    return CompanyRepository.findMany(filters);
  }

  static async getCompanyById(id: string) {
    const company = await CompanyRepository.findById(id);
    if (!company) {
      throw { statusCode: 404, message: COMPANY_MESSAGES.NOT_FOUND };
    }
    return company;
  }

  static async createCompany(data: CreateCompanyInput) {
    const existing = await CompanyRepository.findByCode(data.code);
    if (existing) {
      throw { statusCode: 400, message: COMPANY_MESSAGES.CODE_EXISTS };
    }
    return CompanyRepository.create(data);
  }

  static async updateCompany(id: string, data: UpdateCompanyInput) {
    await this.getCompanyById(id);
    return CompanyRepository.update(id, data);
  }

  static async deleteCompany(id: string) {
    await this.getCompanyById(id);
    return CompanyRepository.softDelete(id);
  }
}
