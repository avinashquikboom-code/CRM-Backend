import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(2, 'Employee code must be at least 2 characters').toUpperCase(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  designation: z.string().optional(),
  branchId: z.string().optional().or(z.literal('')),
  departmentId: z.string().optional().or(z.literal('')),
  reportingToId: z.string().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
});

export const updateEmployeeSchema = createEmployeeSchema.partial().omit({ employeeCode: true });

export const employeeQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  branchId: z.string().optional(),
  departmentId: z.string().optional(),
  designation: z.string().optional(),
});
