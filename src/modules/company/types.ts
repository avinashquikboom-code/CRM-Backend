export interface CompanyEntity {
  id: string;
  code: string;
  name: string;
  registrationNumber?: string | null;
  domain?: string | null;
  logoUrl?: string | null;
  subscriptionTier: string;
  maxEmployees: number;
  maxShipments: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateCompanyInput {
  code: string;
  name: string;
  registrationNumber?: string;
  domain?: string;
  logoUrl?: string;
  subscriptionTier?: string;
  maxEmployees?: number;
  maxShipments?: number;
  status?: string;
}

export interface UpdateCompanyInput {
  name?: string;
  registrationNumber?: string;
  domain?: string;
  logoUrl?: string;
  subscriptionTier?: string;
  maxEmployees?: number;
  maxShipments?: number;
  status?: string;
}

export interface CompanyQueryFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  subscriptionTier?: string;
}
