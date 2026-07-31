import prisma from '../../config/database';
import { CreateBranchInput, UpdateBranchInput, BranchQueryFilters } from './types';

export class BranchRepository {
  static async findMany(filters: BranchQueryFilters) {
    const { companyId, page = 1, pageSize = 10, search, branchType } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (branchType) where.branchType = branchType;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { branchCode: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.branch.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.branch.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async findById(companyId: string, id: string) {
    return prisma.branch.findFirst({
      where: { id, companyId, deletedAt: null },
    });
  }

  static async findByCode(companyId: string, branchCode: string) {
    return prisma.branch.findFirst({
      where: { companyId, branchCode, deletedAt: null },
    });
  }

  static async create(data: CreateBranchInput) {
    return prisma.branch.create({
      data: data as any,
    });
  }

  static async update(companyId: string, id: string, data: UpdateBranchInput) {
    return prisma.branch.update({
      where: { id },
      data: data as any,
    });
  }

  static async softDelete(companyId: string, id: string) {
    return prisma.branch.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
