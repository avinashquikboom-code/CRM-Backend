import { z } from 'zod';

export const createBranchSchema = z.object({
  branchCode: z.string().min(2, 'Branch code must be at least 2 characters').toUpperCase(),
  name: z.string().min(2, 'Branch name must be at least 2 characters'),
  branchType: z.enum(['MAIN', 'OPERATIONAL', 'SATELLITE']).default('OPERATIONAL'),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  operatingHours: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateBranchSchema = createBranchSchema.partial().omit({ branchCode: true });

export const branchQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  branchType: z.string().optional(),
});
