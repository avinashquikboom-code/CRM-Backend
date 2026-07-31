import { BranchRepository } from './repository';
import { CreateBranchInput, UpdateBranchInput, BranchQueryFilters } from './types';
import { BRANCH_MESSAGES } from './constants';

export class BranchService {
  static async getBranches(filters: BranchQueryFilters) {
    return BranchRepository.findMany(filters);
  }

  static async getBranchById(companyId: string, id: string) {
    const branch = await BranchRepository.findById(companyId, id);
    if (!branch) {
      throw { statusCode: 404, message: BRANCH_MESSAGES.NOT_FOUND };
    }
    return branch;
  }

  static async createBranch(data: CreateBranchInput) {
    const existing = await BranchRepository.findByCode(data.companyId, data.branchCode);
    if (existing) {
      throw { statusCode: 400, message: BRANCH_MESSAGES.CODE_EXISTS };
    }
    return BranchRepository.create(data);
  }

  static async updateBranch(companyId: string, id: string, data: UpdateBranchInput) {
    await this.getBranchById(companyId, id);
    return BranchRepository.update(companyId, id, data);
  }

  static async deleteBranch(companyId: string, id: string) {
    await this.getBranchById(companyId, id);
    return BranchRepository.softDelete(companyId, id);
  }
}
