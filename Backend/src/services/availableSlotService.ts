import { AvailableSlotRepo } from '../repositories/availableSlotRepo.js';
import type { AvailableSlot } from '../models/AvailableSlot.js';

export class AvailableSlotService {

    private availableSlotService : AvailableSlotRepo

    constructor(availableSlotService: AvailableSlotRepo) {
        this.availableSlotService = availableSlotService
    }

    getAll(): {success: boolean, reason?: string, result?: AvailableSlot[]} {
        const result = this.availableSlotService.getAll()
        return result
    }

    getByID(ID: string): {success: boolean, reason?: string, result?: AvailableSlot} {
        const result = this.availableSlotService.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, result: result.result!}
        }
    }

    add(employeeId: string, startTime: Date, isBooked: boolean) : {success: boolean, reason?: string} {
        if (startTime < new Date()) {
            return {success: false, reason: "Start time must be in the future"}
        }

        const result = this.availableSlotService.add(employeeId, startTime, isBooked)
        return {success: true, reason: result.result}
    }

    delete(ID: string): {success: boolean, reason?: string} {
        const result = this.availableSlotService.delete(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, reason: result.reason!}
        }
    }
}