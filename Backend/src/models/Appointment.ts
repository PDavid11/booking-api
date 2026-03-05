import { AppointmentStatus } from "../enums/enums.js";

export class Appointment {

    private ID : string
    private guestID: string
    private serviceID: string
    private startTime: Date
    private endTime: Date
    private status: AppointmentStatus
    private createdAt: Date

    constructor(ID: string, guestID: string, serviceID: string, startTime: Date, endTime: Date, status: AppointmentStatus, createdAt: Date) {
        this.ID = ID
        this.guestID = guestID
        this.serviceID = serviceID
        this.startTime = startTime
        this.endTime = endTime
        this.status = AppointmentStatus.PENDING
        this.createdAt = new Date()
    }

    getID() {return this.ID}
    getStatus() {return this.status}
    getStartTime() {return this.startTime}
    getEndTime() {return this.endTime}

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