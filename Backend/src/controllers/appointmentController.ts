import type { AppointmentStatus } from "../enums/enums.js";
import { AppointmentService } from "../services/appointmentService.js";
import type { Request, Response } from "express";

export class AppointmentController {

    private appointmentController : AppointmentService

    constructor(appointmentController: AppointmentService) {
        this.appointmentController = appointmentController
    }

    add(req: Request, res: Response) {
        const {name, phone, serviceID, employeeID, slotID, startTime} = req.body
        const result = this.appointmentController.add(name, phone, employeeID, serviceID, slotID, startTime)
        res.status(201).json(result)
    }

    modifyStatus(req: Request, res: Response) {
        const {id, status} = req.body
        if (status === "CONFIRMED") {
            const result = this.appointmentController.confirmAppointment(id)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200).json({success: true})
            }
        } else if (status === "REJECTED") {
            const result = this.appointmentController.rejectAppointment(id)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200).json({success: true})
            }
        } else if (status === "CANCELLED") {
            const result = this.appointmentController.cancelAppointment(id)
            if (!result.success) {
                res.status(500).json(result.reason)
            } else {
                res.status(200).json({success: true})
            }
        } else {
            res.status(500).json({success: false})
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

    getByEmployeeID(req: Request, res: Response) {
        const id = req.params['employeeID'] as string
        const result = this.appointmentController.getByEmployeeID(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }

    getActive(req: Request, res: Response) {
        const result = this.appointmentController.getActive()
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }
}