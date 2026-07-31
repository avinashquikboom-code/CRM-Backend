import { z } from 'zod';

export const createCustomerSchema = z.object({
  customerCode: z.string().min(2, 'Customer code must be at least 2 characters').toUpperCase(),
  name: z.string().min(2, 'Customer name must be at least 2 characters'),
  customerType: z.enum(['IMPORTER', 'EXPORTER', 'FREIGHT_FORWARDER', 'CHA', 'CONSIGNEE', 'NOTIFY_PARTY']).default('IMPORTER'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  creditLimit: z.coerce.number().nonnegative().optional().default(0),
  paymentTerms: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateCustomerSchema = createCustomerSchema.partial().omit({ customerCode: true });

export const customerQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  customerType: z.string().optional(),
});
