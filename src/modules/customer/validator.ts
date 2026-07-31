import { createCustomerSchema, updateCustomerSchema, customerQuerySchema } from './dto';

export class CustomerValidator {
  static validateCreate(data: any) {
    return createCustomerSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateCustomerSchema.parse(data);
  }

  static validateQuery(query: any) {
    return customerQuerySchema.parse(query);
  }
}
