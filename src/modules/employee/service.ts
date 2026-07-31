import { EmployeeRepository } from './repository';
import { CreateEmployeeInput, UpdateEmployeeInput, EmployeeQueryFilters } from './types';
import { EMPLOYEE_MESSAGES } from './constants';

export class EmployeeService {
  static async getEmployees(filters: EmployeeQueryFilters) {
    return EmployeeRepository.findMany(filters);
  }

  static async getEmployeeById(companyId: string, id: string) {
    const employee = await EmployeeRepository.findById(companyId, id);
    if (!employee) {
      throw { statusCode: 404, message: EMPLOYEE_MESSAGES.NOT_FOUND };
    }
    return employee;
  }

  static async createEmployee(data: CreateEmployeeInput) {
    const existing = await EmployeeRepository.findByCode(data.companyId, data.employeeCode);
    if (existing) {
      throw { statusCode: 400, message: EMPLOYEE_MESSAGES.CODE_EXISTS };
    }
    return EmployeeRepository.create(data);
  }

  static async updateEmployee(companyId: string, id: string, data: UpdateEmployeeInput) {
    await this.getEmployeeById(companyId, id);
    return EmployeeRepository.update(companyId, id, data);
  }

  static async deleteEmployee(companyId: string, id: string) {
    await this.getEmployeeById(companyId, id);
    return EmployeeRepository.softDelete(companyId, id);
  }
}
