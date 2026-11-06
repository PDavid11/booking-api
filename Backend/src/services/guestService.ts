import { GuestRepo } from "../repositories/guestRepo.js";
import type { Guest } from "../models/Guest.js";

export class GuestService {

    private guestService : GuestRepo

    constructor(guestService: GuestRepo) {
        this.guestService = guestService
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Guest}> {
        let result = await this.guestService.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, result: result.result!}
        }
    }

    async add(name: string, phone: string) : Promise<{result : Guest}> {
        let result = await this.guestService.getByPhone(phone)
        if (!result.success) {
            return await this.guestService.add(name, phone)
        } else {
            return {result : result.result!}
        }
    }
}
