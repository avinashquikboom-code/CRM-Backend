export interface VendorEntity {
  id: string;
  companyId: string;
  vendorCode: string;
  name: string;
  vendorType: string;
  email: string;
  phone?: string | null;
  taxId?: string | null;
  paymentTerms?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateVendorInput {
  companyId: string;
  vendorCode: string;
  name: string;
  vendorType?: string;
  email: string;
  phone?: string;
  taxId?: string;
  paymentTerms?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive?: boolean;
}

export interface UpdateVendorInput {
  name?: string;
  vendorType?: string;
  email?: string;
  phone?: string;
  taxId?: string;
  paymentTerms?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive?: boolean;
}

export interface VendorQueryFilters {
  companyId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  vendorType?: string;
}
