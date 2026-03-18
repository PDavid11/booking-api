import { AppointmentStatus } from "../enums/enums.js";
import { v4 as uuid } from "uuid"

export class Appointment {

    private id : string
    private guestID: string
    private serviceID: string
    private startTime: Date
    private endTime: Date
    private status: AppointmentStatus
    private createdAt: Date

    constructor(guestID: string, serviceID: string, startTime: Date, endTime: Date) {
        this.id = uuid()
        this.guestID = guestID
        this.serviceID = serviceID
        this.startTime = startTime
        this.endTime = endTime
        this.status = AppointmentStatus.PENDING
        this.createdAt = new Date()
    }

    get ID() {return this.id}
    get Status() {return this.status}
    get StartTime() {return this.startTime}
    get EndTime() {return this.endTime}
    get GuestID() {return this.guestID}
    get ServiceID() {return this.serviceID}
    get CreatedAt() {return this.createdAt}

    confirm() {
        if (this.status === AppointmentStatus.PENDING) {
            this.status = AppointmentStatus.CONFIRMED
        }
    }

    reject() {
        if (this.status === AppointmentStatus.PENDING) {
            this.status = AppointmentStatus.REJECTED
        }
    }

    cancel() {
        if (this.status === AppointmentStatus.CONFIRMED || this.status === AppointmentStatus.PENDING) {
            this.status = AppointmentStatus.CANCELLED
        }
    }
}