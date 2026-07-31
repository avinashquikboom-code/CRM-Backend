import { createEmployeeSchema, updateEmployeeSchema, employeeQuerySchema } from './dto';

export class EmployeeValidator {
  static validateCreate(data: any) {
    return createEmployeeSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateEmployeeSchema.parse(data);
  }

  static validateQuery(query: any) {
    return employeeQuerySchema.parse(query);
  }
}
