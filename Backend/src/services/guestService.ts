import { GuestRepo } from "../repositories/guestRepo.js";
import { Gender } from "../enums/enums.js";
import type { Guest } from "../models/Guest.js";

export class GuestService {

    private guestService : GuestRepo

    constructor(guestService: GuestRepo) {
        this.guestService = guestService
    }

    getByID(ID: string): {success: boolean, reason?: string, result?: Guest} {
        let result = this.guestService.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return {success: true, result: result.result!}
        }
    }

    add(name: string, phone: string, gender: Gender) : {ID: string} {
        let result = this.guestService.getByPhone(phone)
        if (!result.success) {
            let newGuest = this.guestService.add(name, phone, gender)
            return {ID: newGuest.ID}
        } else {
            return {ID: result.result!.ID}
        }
    }
}