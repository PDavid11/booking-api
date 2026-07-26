import { AppointmentStatus } from "../enums/enums.js";
import { Appointment } from "../models/Appointment.js";

export class AppointmentRepo {

    private appointment : Appointment[]

    constructor(appointment : Appointment[] = []) {
        this.appointment = appointment
    }

    get Appointment() {return this.appointment}

    getAll(): {success: boolean, reason?: string, result?: Appointment[]} {
        if (this.appointment.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: this.appointment}
        }
    }

    getByID(ID: string): {success: boolean, reason?: string, result?: Appointment} {
        let result = this.appointment.find(r => r.ID === ID)
        if (!result) {
            return {success : false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    getByStatus(status: AppointmentStatus): {success: boolean, reason?: string, result?: Appointment[]} {
        let result = this.appointment.filter(r => r.Status === status)
        if (result.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    getByDate(date: Date): {success: boolean, reason?: string, result?: Appointment[]} {
        let result = this.appointment.filter(r => (
            r.StartTime.getFullYear() === date.getFullYear() && 
            r.StartTime.getMonth() === date.getMonth() && 
            r.StartTime.getDate() === date.getDate()
        ))
        if (result.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    getByGuestID(ID: string): {success: boolean, reason?: string, result?: Appointment[]} {
        let result = this.appointment.filter(r => r.GuestID === ID)
        if (result.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    getByEmployeeID(ID: string): {success: boolean, reason?: string, result?: Appointment[]} {
        let result = this.appointment.filter(r => r.EmployeeID === ID)
        if (result.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    delete(ID: string): {success: boolean, reason?: string} {
        let index = this.appointment.findIndex(i => i.ID === ID)
        if (index === -1) {
            return {success: false, reason: "Not found"}
        } else {
            this.appointment.splice(index, 1)
            return {success: true}
        }
    }

    confirmAppointment(ID: string): {success: boolean, reason?: string} {
        let index = this.appointment.findIndex(i => i.ID === ID)
        if (index === -1) {
            return {success: false, reason: "Not found"}
        } else {
            this.appointment[index]?.confirm()
            return {success: true}
        }
    }

    rejectAppointment(ID: string): {success: boolean, reason?: string} {
        let index = this.appointment.findIndex(i => i.ID === ID)
        if (index === -1) {
            return {success: false, reason: "Not found"}
        } else {
            this.appointment[index]?.reject()
            return {success: true}
        }
    }

    cancelAppointment(ID: string): {success: boolean, reason?: string} {
        let index = this.appointment.findIndex(i => i.ID === ID)
        if (index === -1) {
            return {success: false, reason: "Not found"}
        } else {
            this.appointment[index]?.cancel()
            return {success: true}
        }
    }

    add(guestID: string, serviceID: string, employeeID: string, startTime: Date, endTime: Date): {success: boolean, reason?: string} {
        let results : Appointment[] = []
        for (let i of this.appointment) {
            if (!(startTime >= i.EndTime || endTime <= i.StartTime) && employeeID === i.EmployeeID) {
                results.push(i)
            }
        }
        if (results.length > 0) {
            return {success: false, reason: "Appointment conflict"}
        } else {
            this.appointment.push(new Appointment(guestID, serviceID, employeeID, startTime, endTime))
            return {success: true}
        }
    }
}