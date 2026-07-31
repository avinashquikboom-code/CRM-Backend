import { DepartmentRepository } from './repository';
import { CreateDepartmentInput, UpdateDepartmentInput, DepartmentQueryFilters } from './types';
import { DEPARTMENT_MESSAGES } from './constants';

export class DepartmentService {
  static async getDepartments(filters: DepartmentQueryFilters) {
    return DepartmentRepository.findMany(filters);
  }

  static async getDepartmentById(companyId: string, id: string) {
    const department = await DepartmentRepository.findById(companyId, id);
    if (!department) {
      throw { statusCode: 404, message: DEPARTMENT_MESSAGES.NOT_FOUND };
    }
    return department;
  }

  static async createDepartment(data: CreateDepartmentInput) {
    const existing = await DepartmentRepository.findByCode(data.companyId, data.departmentCode);
    if (existing) {
      throw { statusCode: 400, message: DEPARTMENT_MESSAGES.CODE_EXISTS };
    }
    return DepartmentRepository.create(data);
  }

  static async updateDepartment(companyId: string, id: string, data: UpdateDepartmentInput) {
    await this.getDepartmentById(companyId, id);
    return DepartmentRepository.update(companyId, id, data);
  }

  static async deleteDepartment(companyId: string, id: string) {
    await this.getDepartmentById(companyId, id);
    return DepartmentRepository.softDelete(companyId, id);
  }
}
