export interface EmployeeEntity {
  id: string;
  companyId: string;
  branchId?: string | null;
  departmentId?: string | null;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  designation?: string | null;
  reportingToId?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  branch?: any;
  department?: any;
  reportingTo?: any;
}

export interface CreateEmployeeInput {
  companyId: string;
  branchId?: string;
  departmentId?: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designation?: string;
  reportingToId?: string;
  isActive?: boolean;
}

export interface UpdateEmployeeInput {
  branchId?: string;
  departmentId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  designation?: string;
  reportingToId?: string;
  isActive?: boolean;
}

export interface EmployeeQueryFilters {
  companyId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  branchId?: string;
  departmentId?: string;
  designation?: string;
}
