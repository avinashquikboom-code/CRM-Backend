export const BRANCH_TYPES = {
  MAIN: 'MAIN',
  OPERATIONAL: 'OPERATIONAL',
  SATELLITE: 'SATELLITE',
} as const;

export const BRANCH_MESSAGES = {
  CREATED: 'Branch created successfully',
  UPDATED: 'Branch updated successfully',
  DELETED: 'Branch deleted successfully',
  NOT_FOUND: 'Branch not found',
  CODE_EXISTS: 'Branch code already exists for this company',
  FETCHED: 'Branches retrieved successfully',
  FETCHED_ONE: 'Branch retrieved successfully',
};
