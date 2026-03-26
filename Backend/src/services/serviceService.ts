import { ServiceRepo } from "../repositories/serviceRepo.js";

export class ServiceService {

    private serviceService : ServiceRepo

    constructor(serviceService: ServiceRepo) {
        this.serviceService = serviceService
    }

    add(name: string, durationMinutes: number, price: number) {
        this.serviceService.add(name, durationMinutes, price)
    }

    modifyName(ID: string, newName: string): {success: boolean, reason?: string} {
        return this.serviceService.modifyName(ID, newName)
    }

    modifyPrice(ID: string, newPrice: number): {success: boolean, reason?: string} {
        return this.serviceService.modifyPrice(ID, newPrice)
    }

    modifyDurationMinutes(ID: string, newDurationMinutes: number): {success: boolean, reason?: string} {
        return this.serviceService.modifyDurationMinutes(ID, newDurationMinutes)
    }
}