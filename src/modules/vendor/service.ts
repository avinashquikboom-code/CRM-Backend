import { VendorRepository } from './repository';
import { CreateVendorInput, UpdateVendorInput, VendorQueryFilters } from './types';
import { VENDOR_MESSAGES } from './constants';

export class VendorService {
  static async getVendors(filters: VendorQueryFilters) {
    return VendorRepository.findMany(filters);
  }

  static async getVendorById(companyId: string, id: string) {
    const vendor = await VendorRepository.findById(companyId, id);
    if (!vendor) {
      throw { statusCode: 404, message: VENDOR_MESSAGES.NOT_FOUND };
    }
    return vendor;
  }

  static async createVendor(data: CreateVendorInput) {
    const existing = await VendorRepository.findByCode(data.companyId, data.vendorCode);
    if (existing) {
      throw { statusCode: 400, message: VENDOR_MESSAGES.CODE_EXISTS };
    }
    return VendorRepository.create(data);
  }

  static async updateVendor(companyId: string, id: string, data: UpdateVendorInput) {
    await this.getVendorById(companyId, id);
    return VendorRepository.update(companyId, id, data);
  }

  static async deleteVendor(companyId: string, id: string) {
    await this.getVendorById(companyId, id);
    return VendorRepository.softDelete(companyId, id);
  }
}
