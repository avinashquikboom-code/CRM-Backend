import prisma from '../../config/database';
import { CreateCompanyInput, UpdateCompanyInput, CompanyQueryFilters } from './types';

export class CompanyRepository {
  static async findMany(filters: CompanyQueryFilters) {
    const { page = 1, pageSize = 10, search, status, subscriptionTier } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      deletedAt: null,
    };

    if (status) where.status = status;
    if (subscriptionTier) where.subscriptionTier = subscriptionTier;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { registrationNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.company.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async findById(id: string) {
    return prisma.company.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findByCode(code: string) {
    return prisma.company.findFirst({
      where: { code, deletedAt: null },
    });
  }

  static async create(data: CreateCompanyInput) {
    return prisma.company.create({
      data: data as any,
    });
  }

  static async update(id: string, data: UpdateCompanyInput) {
    return prisma.company.update({
      where: { id },
      data: data as any,
    });
  }

  static async softDelete(id: string) {
    return prisma.company.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE' },
    });
  }
}
