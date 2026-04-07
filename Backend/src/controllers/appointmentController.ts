import type { AppointmentStatus } from "../enums/enums.js";
import { AppointmentService } from "../services/appointmentService.js";
import { GuestService } from "../services/guestService.js";
import type { Request, Response } from "express";

export class appointmentController {

    private appointmentController : AppointmentService

    constructor(appointmentController: AppointmentService) {
        this.appointmentController = appointmentController
    }

    add(req: Request, res: Response) {
        const {name, phone, gender, serviceID, employeeID, startTime, endTime} = req.body
        const result = this.appointmentController.add(name, phone, gender, employeeID, serviceID, startTime, endTime)
        res.status(201).json(result)
    }

    modifyStatus(req: Request, res: Response) {
        const {ID, newStatus} = req.body
        if (newStatus === "confirm") {
            const result = this.appointmentController.confirmAppointment(ID)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200)
            }
        } else if (newStatus === "reject") {
            const result = this.appointmentController.rejectAppointment(ID)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200)
            }
        } else if (newStatus === "cancel") {
            const result = this.appointmentController.cancelAppointment(ID)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200)
            }
        }
    }

    getByStatus(req: Request, res: Response) {
        const status = req.params['status'] as AppointmentStatus 
        const result = this.appointmentController.getByStatus(status)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }

    getByID(req: Request, res: Response) {
        const id = req.params['id'] as string
        const result = this.appointmentController.getByID(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }
}