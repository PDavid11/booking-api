import { GuestService } from "./guestService.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { ServiceRepo } from "../repositories/serviceRepo.js";
import { AppointmentRepo } from "../repositories/appointmentRepo.js";
import { AppointmentStatus, Gender } from "../enums/enums.js";
import type { Appointment } from "../models/Appointment.js";

export class AppointmentService {

    private guestService : GuestService
    private employeeRepo : EmployeeRepo
    private serviceRepo : ServiceRepo
    private appointmentRepo : AppointmentRepo

    constructor(guestService : GuestService, employeeRepo : EmployeeRepo, serviceRepo : ServiceRepo, appointmentRepo : AppointmentRepo) {
        this.guestService = guestService
        this.employeeRepo = employeeRepo
        this.serviceRepo = serviceRepo
        this.appointmentRepo = appointmentRepo
    }

    confirmAppointment(ID: string): {success: boolean, reason?: string} {
        const result = this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status !== AppointmentStatus.PENDING) {
                return {success: false, reason: "This appointment is not pending!"}
            } else {
                return this.appointmentRepo.confirmAppointment(ID)
            }           
        }        
    }

    rejectAppointment(ID: string): {success: boolean, reason?: string} {
        const result = this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status !== AppointmentStatus.PENDING) {
                return {success: false, reason: "This appointment is not pending!"}
            } else {
                return this.appointmentRepo.rejectAppointment(ID)
            }           
        }
    }

    cancelAppointment(ID: string): {success: boolean, reason?: string} {
        const result = this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status === AppointmentStatus.CONFIRMED || result.result!.Status === AppointmentStatus.PENDING) {
                return this.appointmentRepo.cancelAppointment(ID)
            } else {
                return {success: false, reason: "This appointment is not pending or confirmed!"}
            }           
        }
    }

    add(name: string, phone: string, gender: Gender, employeeID: string, serviceID: string, startTime: string): {success: boolean, reason?: string} {
        let guest = this.guestService.add(name, phone, gender)
        const duration = this.serviceRepo.getByID(serviceID).result!.DurationMinutes
        const startDate = new Date(startTime)
        const endTime = new Date(startDate.getTime() + duration * 60000)
        if (!this.employeeRepo.getByID(employeeID).success) {
            return {success: false, reason: "Employee not found"}
        } else if (!this.serviceRepo.getByID(serviceID).success) {
            return {success: false, reason: "Service not found"}
        } else {
             return this.appointmentRepo.add(guest.result.ID, serviceID, employeeID, startDate, endTime)
        }
    }

    getByID(ID: string): {success: boolean, reason?: string} {
        return this.appointmentRepo.getByID(ID)
    }

    getByStatus(status: AppointmentStatus): {success: boolean, reason?: string, result?: Appointment[]} {
        return this.appointmentRepo.getByStatus(status)
    }

    getByEmployeeID(ID: string): {success: boolean, reason?: string, result?: Appointment[]} {
        return this.appointmentRepo.getByEmployeeID(ID)
    }

    getAll(): {success: boolean, reason?: string, result?: Appointment[]} {
        return this.appointmentRepo.getAll()
    }
}