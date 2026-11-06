import { ServiceRepo } from "../repositories/serviceRepo.js";
import { Service } from "../models/Service.js";

export class ServiceService {

    private serviceService : ServiceRepo

    constructor(serviceService: ServiceRepo) {
        this.serviceService = serviceService
    }

    async add(name: string, durationMinutes: number, price: number): Promise<{result: Service}> {
        return await this.serviceService.add(name, durationMinutes, price)
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        return await this.serviceService.delete(ID)
    }

    async modifyName(ID: string, newName: string): Promise<{success: boolean, reason?: string}> {
        return await this.serviceService.modifyName(ID, newName)
    }

    async modifyPrice(ID: string, newPrice: number): Promise<{success: boolean, reason?: string}> {
        return await this.serviceService.modifyPrice(ID, newPrice)
    }

    async modifyDurationMinutes(ID: string, newDurationMinutes: number): Promise<{success: boolean, reason?: string}> {
        return await this.serviceService.modifyDurationMinutes(ID, newDurationMinutes)
    }

    async getAll() : Promise<{result: Service[]}> {
        return {result : await this.serviceService.Service}
    }
}
