export interface DepartmentEntity {
  id: string;
  companyId: string;
  departmentCode: string;
  name: string;
  departmentType: string;
  headId?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateDepartmentInput {
  companyId: string;
  departmentCode: string;
  name: string;
  departmentType?: string;
  headId?: string;
  isActive?: boolean;
}

export interface UpdateDepartmentInput {
  name?: string;
  departmentType?: string;
  headId?: string;
  isActive?: boolean;
}

export interface DepartmentQueryFilters {
  companyId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  departmentType?: string;
}
