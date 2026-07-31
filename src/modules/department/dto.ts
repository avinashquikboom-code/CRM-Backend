import { z } from 'zod';

export const createDepartmentSchema = z.object({
  departmentCode: z.string().min(2, 'Department code must be at least 2 characters').toUpperCase(),
  name: z.string().min(2, 'Department name must be at least 2 characters'),
  departmentType: z.enum(['GENERAL', 'OPERATIONS', 'SALES', 'FINANCE', 'CUSTOMS', 'HR', 'IT']).default('GENERAL'),
  headId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateDepartmentSchema = createDepartmentSchema.partial().omit({ departmentCode: true });

export const departmentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  departmentType: z.string().optional(),
});
