import { CustomerRepository } from './repository';
import { CreateCustomerInput, UpdateCustomerInput, CustomerQueryFilters } from './types';
import { CUSTOMER_MESSAGES } from './constants';

export class CustomerService {
  static async getCustomers(filters: CustomerQueryFilters) {
    return CustomerRepository.findMany(filters);
  }

  static async getCustomerById(companyId: string, id: string) {
    const customer = await CustomerRepository.findById(companyId, id);
    if (!customer) {
      throw { statusCode: 404, message: CUSTOMER_MESSAGES.NOT_FOUND };
    }
    return customer;
  }

  static async createCustomer(data: CreateCustomerInput) {
    const existing = await CustomerRepository.findByCode(data.companyId, data.customerCode);
    if (existing) {
      throw { statusCode: 400, message: CUSTOMER_MESSAGES.CODE_EXISTS };
    }
    return CustomerRepository.create(data);
  }

  static async updateCustomer(companyId: string, id: string, data: UpdateCustomerInput) {
    await this.getCustomerById(companyId, id);
    return CustomerRepository.update(companyId, id, data);
  }

  static async deleteCustomer(companyId: string, id: string) {
    await this.getCustomerById(companyId, id);
    return CustomerRepository.softDelete(companyId, id);
  }
}
