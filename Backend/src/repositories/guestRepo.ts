import type { Gender } from "../enums/enums.js";
import { Guest } from "../models/Guest.js";

export class GuestRepo {

    private guest : Guest[]

    constructor(guest : Guest[] = []) {
        this.guest = guest
    }

    get Guest() {return this.guest}

    getByID(ID: string): {success: boolean, reason?: string, result?: Guest} {
        let result = this.guest.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}          
        } else {
            return {success: true, result: result}
        }
    }

    getByPhone(phone: string): {success: boolean, reason?: string, result?: Guest} {
        let result = this.Guest.find(r => r.Phone === phone)
        if (!result) {
            return {success: false, reason: "Not found"}    
        } else {
            return {success: true, result: result}
        }
    }

    add(name: string, phone: string, gender: Gender): {result : Guest} {
        let NewGuest = new Guest(name, phone, gender)
        this.guest.push(NewGuest)
        return {result : NewGuest}
    }

    delete(ID: string): {success: boolean, reason?: string} {
        let index = this.guest.findIndex(i => i.ID === ID)
        if (index === -1) {
            return { success: false, reason: "Not found"}
        } else {
            this.guest.splice(index, 1)
            return { success: true }
        }
    }
}