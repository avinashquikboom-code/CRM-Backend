import prisma from '../../config/database';
import { CreateCustomerInput, UpdateCustomerInput, CustomerQueryFilters } from './types';

export class CustomerRepository {
  static async findMany(filters: CustomerQueryFilters) {
    const { companyId, page = 1, pageSize = 10, search, customerType } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (customerType) where.customerType = customerType;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { customerCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { taxId: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count({ where }),
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
    return prisma.customer.findFirst({
      where: { id, companyId, deletedAt: null },
    });
  }

  static async findByCode(companyId: string, customerCode: string) {
    return prisma.customer.findFirst({
      where: { companyId, customerCode, deletedAt: null },
    });
  }

  static async create(data: CreateCustomerInput) {
    return prisma.customer.create({
      data: data as any,
    });
  }

  static async update(companyId: string, id: string, data: UpdateCustomerInput) {
    return prisma.customer.update({
      where: { id },
      data: data as any,
    });
  }

  static async softDelete(companyId: string, id: string) {
    return prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
