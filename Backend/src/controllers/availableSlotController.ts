import { AvailableSlotService } from "../services/availableSlotService.js"
import type { Request, Response } from "express";

export class AvailableSlotController {

    private availableSlotController : AvailableSlotService

    constructor(availableSlotController: AvailableSlotService) {
        this.availableSlotController = availableSlotController
    }

    getAll(req: Request, res: Response) {
        const result = this.availableSlotController.getAll()
        res.status(200).json(result)
    }

    getByID(req: Request, res: Response) {
        const id = req.params['id'] as string
        const result = this.availableSlotController.getByID(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }

    add(req: Request, res: Response) {
        const {employeeId, startTime, isBooked} = req.body
        const start = new Date(startTime)
        const result = this.availableSlotController.add(employeeId, start, isBooked)
        if (!result.success) {
            res.status(400).json(result.reason)
        } else {
            res.status(201).json({success: true, reason: result.reason})
        }
    }

    delete(req: Request, res: Response) {
        const id = req.params['id'] as string
        const result = this.availableSlotController.delete(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json({success: true, reason: result.reason})
        }
    }
}