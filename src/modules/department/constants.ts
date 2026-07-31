export const DEPARTMENT_TYPES = {
  GENERAL: 'GENERAL',
  OPERATIONS: 'OPERATIONS',
  SALES: 'SALES',
  FINANCE: 'FINANCE',
  CUSTOMS: 'CUSTOMS',
  HR: 'HR',
  IT: 'IT',
} as const;

export const DEPARTMENT_MESSAGES = {
  CREATED: 'Department created successfully',
  UPDATED: 'Department updated successfully',
  DELETED: 'Department deleted successfully',
  NOT_FOUND: 'Department not found',
  CODE_EXISTS: 'Department code already exists for this company',
  FETCHED: 'Departments retrieved successfully',
  FETCHED_ONE: 'Department retrieved successfully',
};
