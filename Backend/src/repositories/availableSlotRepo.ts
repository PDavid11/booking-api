import { AvailableSlot } from "../models/AvailableSlot.js"

export class AvailableSlotRepo {

    private availableSlot : AvailableSlot[]

    constructor(availableSlot : AvailableSlot[] = []) {
        this.availableSlot = availableSlot
    }

    get AvailableSlot() {return this.availableSlot}

    getAll(): {success: boolean, reason?: string, result?: AvailableSlot[]} {
        if (this.availableSlot.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: this.availableSlot}
        }
    }

    getByID(ID: string): {success: boolean, reason?: string, result?: AvailableSlot} {
        let result = this.availableSlot.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    add (employeeId: string, startTime: Date, endTime: Date, isBooked: boolean): {result: string} {
        let newAvailableSlot = new AvailableSlot(employeeId, startTime, endTime, isBooked)
        this.availableSlot.push(newAvailableSlot)
        return {result : "slot added successfully"}
    }

    delete(ID: string): {success: boolean, reason?: string} {
        let index = this.availableSlot.findIndex(i => i.ID === ID)
        if (index === -1) {
            return {success: false, reason: "Not found"}
        } else {
            this.availableSlot.splice(index, 1)
            return {success: true, reason: "Slot deleted successfully"}
        }
    }
}