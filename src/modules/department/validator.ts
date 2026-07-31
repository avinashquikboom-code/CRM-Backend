import { createDepartmentSchema, updateDepartmentSchema, departmentQuerySchema } from './dto';

export class DepartmentValidator {
  static validateCreate(data: any) {
    return createDepartmentSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateDepartmentSchema.parse(data);
  }

  static validateQuery(query: any) {
    return departmentQuerySchema.parse(query);
  }
}
