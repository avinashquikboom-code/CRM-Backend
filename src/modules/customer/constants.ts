export const CUSTOMER_TYPES = {
  IMPORTER: 'IMPORTER',
  EXPORTER: 'EXPORTER',
  FREIGHT_FORWARDER: 'FREIGHT_FORWARDER',
  CHA: 'CHA',
  CONSIGNEE: 'CONSIGNEE',
  NOTIFY_PARTY: 'NOTIFY_PARTY',
} as const;

export const CUSTOMER_MESSAGES = {
  CREATED: 'Customer created successfully',
  UPDATED: 'Customer updated successfully',
  DELETED: 'Customer deleted successfully',
  NOT_FOUND: 'Customer not found',
  CODE_EXISTS: 'Customer code already exists for this company',
  FETCHED: 'Customers retrieved successfully',
  FETCHED_ONE: 'Customer retrieved successfully',
};
