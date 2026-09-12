import { AvailableSlotRepo } from '../repositories/AvailableSlotRepo.js';
import type { AvailableSlot } from '../models/AvailableSlot.js';

export class AvailableSlotService {

    private availableSlotService : AvailableSlotRepo

    constructor(availableSlotService: AvailableSlotRepo) {
        this.availableSlotService = availableSlotService
    }

    getAll(): {success: boolean, reason?: string, result?: AvailableSlot[]} {
        let result = this.availableSlotService.getAll()
        return result
    }

    getByID(ID: string): {success: boolean, reason?: string, result?: AvailableSlot} {
        let result = this.availableSlotService.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, result: result.result!}
        }
    }

    add(employeeId: string, startTime: Date, endTime: Date, isBooked: boolean) : {success: boolean, reason?: string} {
        if (startTime >= endTime) {
            return {success: false, reason: "Start time must be before end time"}
        }
        if (startTime < new Date()) {
            return {success: false, reason: "Start time must be in the future"}
        }

        const result = this.availableSlotService.add(employeeId, startTime, endTime, isBooked)
        return {success: true, reason: result.result}
    }

    delete(ID: string): {success: boolean, reason?: string} {
        let result = this.availableSlotService.delete(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, reason: result.reason!}
        }
    }
}