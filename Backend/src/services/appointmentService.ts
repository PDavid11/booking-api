import { GuestService } from "./guestService.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { ServiceRepo } from "../repositories/serviceRepo.js";
import { AppointmentRepo } from "../repositories/appointmentRepo.js";
import { AppointmentStatus, Gender } from "../enums/enums.js";
import { Appointment } from "../models/Appointment.js";

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

    async confirmAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const result = await this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status !== AppointmentStatus.PENDING) {
                return {success: false, reason: "This appointment is not pending!"}
            } else {
                return await this.appointmentRepo.confirmAppointment(ID)
            }           
        }        
    }

    async rejectAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const result = await this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status !== AppointmentStatus.PENDING) {
                return {success: false, reason: "This appointment is not pending!"}
            } else {
                return await this.appointmentRepo.rejectAppointment(ID)
            }           
        }
    }

    async cancelAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const result = await this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            if (result.result!.Status === AppointmentStatus.CONFIRMED || result.result!.Status === AppointmentStatus.PENDING) {
                return await this.appointmentRepo.cancelAppointment(ID)
            } else {
                return {success: false, reason: "This appointment is not pending or confirmed!"}
            }           
        }
    }

    async deleteAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const result = await this.appointmentRepo.getByID(ID)
        if (!result.success) {
            return {success: false, reason: result.reason!}
        } else {
            return await this.appointmentRepo.delete(ID)
        }
    } 

    async add(name: string, phone: string, employeeID: string, serviceID: string, slotID: string, startTime: string): Promise<{success: boolean, reason?: string}> {
        const guest = await this.guestService.add(name, phone)
        const service = await this.serviceRepo.getByID(serviceID)
        const employee = await this.employeeRepo.getByID(employeeID)
        if (!employee.success) {
            return {success: false, reason: "Employee not found"}
        } else if (!service.success) {
            return {success: false, reason: "Service not found"}
        } else {
            const duration = service.result!.DurationMinutes
            const startDate = new Date(startTime)
            const endTime = new Date(startDate.getTime() + duration * 60000)
            return await this.appointmentRepo.add(guest.result.ID, serviceID, employeeID, slotID, startDate, endTime)
        }
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Appointment}> {
        return await this.appointmentRepo.getByID(ID)
    }

    async getByStatus(status: AppointmentStatus): Promise<{success: boolean, reason?: string, result?: any[]}> {
        const appointmentP = await this.appointmentRepo.getByStatus(status)
        const appointmentWithGuestData = await Promise.all(
            (appointmentP.result ?? []).map(async (app) => {
                const guest = await this.guestService.getByID(app.guestID)
                const service = await this.serviceRepo.getByID(app.serviceID)
                const employee = await this.employeeRepo.getByID(app.employeeID)
                return {
                    ...app,
                    guestName: guest.result!.Name,
                    phone: guest.result!.Phone,
                    serviceName: service.result!.Name,
                    employeeName: employee.result!.Name
                }
            })
        )
        if (!appointmentP.success) {
            return appointmentP.reason !== undefined
                ? {success: appointmentP.success, reason: appointmentP.reason}
                : {success: appointmentP.success}        
        } else {
            return {success: appointmentP.success, result: appointmentWithGuestData}
        }
    }

    async getByEmployeeID(ID: string): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        return await this.appointmentRepo.getByEmployeeID(ID)
    }

    async getActive(): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const appointments = await this.appointmentRepo.getAll()
        const activeAppointments = appointments.result?.filter(app => (app.Status !== "CANCELLED" && app.Status !== "REJECTED"))
        return {
            success: appointments.success,
            ...(appointments.reason !== undefined ? {reason: appointments.reason} : {}),
            ...(activeAppointments !== undefined ? {result: activeAppointments} : {})
        }
    }
}
