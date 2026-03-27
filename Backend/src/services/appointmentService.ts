import { GuestService } from "./guestService.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { ServiceRepo } from "../repositories/serviceRepo.js";
import { AppointmentRepo } from "../repositories/appointmentRepo.js";
import { Gender } from "../enums/enums.js";

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
        return this.appointmentRepo.confirmAppointment(ID)
    }

    rejectAppointment(ID: string): {success: boolean, reason?: string} {
        return this.appointmentRepo.rejectAppointment(ID)
    }

    cancelAppointment(ID: string): {success: boolean, reason?: string} {
        return this.appointmentRepo.cancelAppointment(ID)
    }

    add(name: string, phone: string, gender: Gender, employeeID: string, serviceID: string, startTime: Date, endTime: Date): {success: boolean, reason?: string} {
        let guest = this.guestService.add(name, phone, gender)
        if (!this.employeeRepo.getByID(employeeID).success) {
            return {success: false, reason: "Employee not found"}
        } else if (!this.serviceRepo.getByID(serviceID).success) {
            return {success: false, reason: "Service not found"}
        } else {
             return this.appointmentRepo.add(guest.ID, serviceID, employeeID, startTime, endTime)
        }
    }
}