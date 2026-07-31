import { z } from 'zod';

export const createCompanySchema = z.object({
  code: z.string().min(2, 'Company code must be at least 2 characters').toUpperCase(),
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  registrationNumber: z.string().optional(),
  domain: z.string().optional(),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  subscriptionTier: z.enum(['STARTER', 'PROFESSIONAL', 'ENTERPRISE']).default('ENTERPRISE'),
  maxEmployees: z.number().int().positive().default(100),
  maxShipments: z.number().int().positive().default(10000),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).default('ACTIVE'),
});

export const updateCompanySchema = createCompanySchema.partial().omit({ code: true });

export const companyQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  subscriptionTier: z.string().optional(),
});
