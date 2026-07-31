import { createBranchSchema, updateBranchSchema, branchQuerySchema } from './dto';

export class BranchValidator {
  static validateCreate(data: any) {
    return createBranchSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateBranchSchema.parse(data);
  }

  static validateQuery(query: any) {
    return branchQuerySchema.parse(query);
  }
}
