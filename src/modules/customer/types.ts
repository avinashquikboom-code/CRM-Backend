export interface CustomerEntity {
  id: string;
  companyId: string;
  customerCode: string;
  name: string;
  customerType: string;
  email: string;
  phone?: string | null;
  taxId?: string | null;
  creditLimit?: number | null;
  paymentTerms?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateCustomerInput {
  companyId: string;
  customerCode: string;
  name: string;
  customerType?: string;
  email: string;
  phone?: string;
  taxId?: string;
  creditLimit?: number;
  paymentTerms?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive?: boolean;
}

export interface UpdateCustomerInput {
  name?: string;
  customerType?: string;
  email?: string;
  phone?: string;
  taxId?: string;
  creditLimit?: number;
  paymentTerms?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive?: boolean;
}

export interface CustomerQueryFilters {
  companyId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  customerType?: string;
}
