import prisma from '../../config/database';
import { CreateDepartmentInput, UpdateDepartmentInput, DepartmentQueryFilters } from './types';

export class DepartmentRepository {
  static async findMany(filters: DepartmentQueryFilters) {
    const { companyId, page = 1, pageSize = 10, search, departmentType } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (departmentType) where.departmentType = departmentType;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { departmentCode: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.department.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.department.count({ where }),
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
    return prisma.department.findFirst({
      where: { id, companyId, deletedAt: null },
    });
  }

  static async findByCode(companyId: string, departmentCode: string) {
    return prisma.department.findFirst({
      where: { companyId, departmentCode, deletedAt: null },
    });
  }

  static async create(data: CreateDepartmentInput) {
    return prisma.department.create({
      data: data as any,
    });
  }

  static async update(companyId: string, id: string, data: UpdateDepartmentInput) {
    return prisma.department.update({
      where: { id },
      data: data as any,
    });
  }

  static async softDelete(companyId: string, id: string) {
    return prisma.department.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
