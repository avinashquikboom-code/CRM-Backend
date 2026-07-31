import prisma from '../../config/database';
import { CreateEmployeeInput, UpdateEmployeeInput, EmployeeQueryFilters } from './types';

export class EmployeeRepository {
  static async findMany(filters: EmployeeQueryFilters) {
    const { companyId, page = 1, pageSize = 10, search, branchId, departmentId, designation } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (branchId) where.branchId = branchId;
    if (departmentId) where.departmentId = departmentId;
    if (designation) where.designation = designation;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { employeeCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          branch: { select: { id: true, name: true, branchCode: true } },
          department: { select: { id: true, name: true, departmentCode: true } },
          reportingTo: { select: { id: true, firstName: true, lastName: true, employeeCode: true } },
        },
      }),
      prisma.employee.count({ where }),
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
    return prisma.employee.findFirst({
      where: { id, companyId, deletedAt: null },
      include: {
        branch: { select: { id: true, name: true, branchCode: true } },
        department: { select: { id: true, name: true, departmentCode: true } },
        reportingTo: { select: { id: true, firstName: true, lastName: true, employeeCode: true } },
      },
    });
  }

  static async findByCode(companyId: string, employeeCode: string) {
    return prisma.employee.findFirst({
      where: { companyId, employeeCode, deletedAt: null },
    });
  }

  static async create(data: CreateEmployeeInput) {
    const payload = {
      ...data,
      branchId: data.branchId || null,
      departmentId: data.departmentId || null,
      reportingToId: data.reportingToId || null,
    };
    return prisma.employee.create({
      data: payload as any,
      include: {
        branch: true,
        department: true,
        reportingTo: true,
      },
    });
  }

  static async update(companyId: string, id: string, data: UpdateEmployeeInput) {
    const payload: any = { ...data };
    if ('branchId' in data) payload.branchId = data.branchId || null;
    if ('departmentId' in data) payload.departmentId = data.departmentId || null;
    if ('reportingToId' in data) payload.reportingToId = data.reportingToId || null;

    return prisma.employee.update({
      where: { id },
      data: payload,
      include: {
        branch: true,
        department: true,
        reportingTo: true,
      },
    });
  }

  static async softDelete(companyId: string, id: string) {
    return prisma.employee.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
