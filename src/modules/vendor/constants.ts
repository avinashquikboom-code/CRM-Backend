export const VENDOR_TYPES = {
  TRUCKER: 'TRUCKER',
  WAREHOUSE: 'WAREHOUSE',
  LOCAL_CARRIER: 'LOCAL_CARRIER',
  OVERSEAS_AGENT: 'OVERSEAS_AGENT',
  PACKER: 'PACKER',
  INSPECTOR: 'INSPECTOR',
  OTHER: 'OTHER',
} as const;

export const VENDOR_MESSAGES = {
  CREATED: 'Vendor created successfully',
  UPDATED: 'Vendor updated successfully',
  DELETED: 'Vendor deleted successfully',
  NOT_FOUND: 'Vendor not found',
  CODE_EXISTS: 'Vendor code already exists for this company',
  FETCHED: 'Vendors retrieved successfully',
  FETCHED_ONE: 'Vendor retrieved successfully',
};
