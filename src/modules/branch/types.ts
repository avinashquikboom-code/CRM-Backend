export interface BranchEntity {
  id: string;
  companyId: string;
  branchCode: string;
  name: string;
  branchType: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  operatingHours?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateBranchInput {
  companyId: string;
  branchCode: string;
  name: string;
  branchType?: string;
  address?: string;
  city?: string;
  country?: string;
  operatingHours?: string;
  isActive?: boolean;
}

export interface UpdateBranchInput {
  name?: string;
  branchType?: string;
  address?: string;
  city?: string;
  country?: string;
  operatingHours?: string;
  isActive?: boolean;
}

export interface BranchQueryFilters {
  companyId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  branchType?: string;
}
