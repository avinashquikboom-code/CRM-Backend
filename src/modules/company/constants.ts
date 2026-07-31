export const COMPANY_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;

export const SUBSCRIPTION_TIERS = {
  STARTER: 'STARTER',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export const COMPANY_MESSAGES = {
  CREATED: 'Company created successfully',
  UPDATED: 'Company updated successfully',
  DELETED: 'Company deleted successfully',
  NOT_FOUND: 'Company not found',
  CODE_EXISTS: 'Company code already exists',
  FETCHED: 'Companies retrieved successfully',
  FETCHED_ONE: 'Company retrieved successfully',
};
