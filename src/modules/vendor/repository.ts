import prisma from '../../config/database';
import { CreateVendorInput, UpdateVendorInput, VendorQueryFilters } from './types';

export class VendorRepository {
  static async findMany(filters: VendorQueryFilters) {
    const { companyId, page = 1, pageSize = 10, search, vendorType } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (vendorType) where.vendorType = vendorType;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { vendorCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { taxId: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.vendor.count({ where }),
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
    return prisma.vendor.findFirst({
      where: { id, companyId, deletedAt: null },
    });
  }

  static async findByCode(companyId: string, vendorCode: string) {
    return prisma.vendor.findFirst({
      where: { companyId, vendorCode, deletedAt: null },
    });
  }

  static async create(data: CreateVendorInput) {
    return prisma.vendor.create({
      data: data as any,
    });
  }

  static async update(companyId: string, id: string, data: UpdateVendorInput) {
    return prisma.vendor.update({
      where: { id },
      data: data as any,
    });
  }

  static async softDelete(companyId: string, id: string) {
    return prisma.vendor.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
