import { AvailableSlotRepo } from '../repositories/availableSlotRepo.js';
import type { AvailableSlot } from '../models/AvailableSlot.js';

export class AvailableSlotService {

    private availableSlotService : AvailableSlotRepo

    constructor(availableSlotService: AvailableSlotRepo) {
        this.availableSlotService = availableSlotService
    }

    async getAll(): Promise<{success: boolean, reason?: string, result?: AvailableSlot[]}> {
        const result = await this.availableSlotService.getAll()
        return result
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: AvailableSlot}> {
        const result = await this.availableSlotService.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, result: result.result!}
        }
    }

    async add(employeeId: string, startTime: Date, isBooked: boolean) : Promise<{success: boolean, reason?: string}> {
        if (startTime < new Date()) {
            return {success: false, reason: "Start time must be in the future"}
        }

        const result = await this.availableSlotService.add(employeeId, startTime, isBooked)
        return {success: true, reason: result.result}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const result = await this.availableSlotService.delete(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, reason: result.reason!}
        }
    }

    async modifySlot(ID: string, isBooked: boolean): Promise<{success: boolean, reason?: string}> {
        const result = await this.availableSlotService.modifySlot(ID, isBooked)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, reason: result.reason!}
        }
    }
}