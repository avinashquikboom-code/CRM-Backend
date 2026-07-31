import { z } from 'zod';

export const createVendorSchema = z.object({
  vendorCode: z.string().min(2, 'Vendor code must be at least 2 characters').toUpperCase(),
  name: z.string().min(2, 'Vendor name must be at least 2 characters'),
  vendorType: z.enum(['TRUCKER', 'WAREHOUSE', 'LOCAL_CARRIER', 'OVERSEAS_AGENT', 'PACKER', 'INSPECTOR', 'OTHER']).default('TRUCKER'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  paymentTerms: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateVendorSchema = createVendorSchema.partial().omit({ vendorCode: true });

export const vendorQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  vendorType: z.string().optional(),
});
