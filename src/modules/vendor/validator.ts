import { createVendorSchema, updateVendorSchema, vendorQuerySchema } from './dto';

export class VendorValidator {
  static validateCreate(data: any) {
    return createVendorSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateVendorSchema.parse(data);
  }

  static validateQuery(query: any) {
    return vendorQuerySchema.parse(query);
  }
}
