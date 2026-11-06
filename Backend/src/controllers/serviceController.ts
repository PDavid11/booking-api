import { ServiceService } from "../services/serviceService.js";
import type { Request, Response } from "express";

export class ServiceController {

     private serviceController : ServiceService

     constructor(serviceController : ServiceService) {
        this.serviceController = serviceController
     }

     async add(req: Request, res: Response) {
        try {
            const {name, durationMinutes, price} = req.body
            const result = await this.serviceController.add(name, Number(durationMinutes), Number(price))
            res.status(201).json(result)
        } catch {
            res.status(500).json({success: false, message: "Failed to add service"})
        }
     }

     async delete(req: Request, res: Response) {
        try {
            const {id} = req.body
            const result = await this.serviceController.delete(id)
            if (!result.success) {
                res.status(404).json(result.reason)
            } else {
                res.status(200).json(result)
            }
        } catch {
            res.status(500).json({success: false, message: "Failed to delete service"})
        }
     }

     async modify(req: Request, res: Response) {
        try {
            const {id, name, durationMinutes, price} = req.body
            const NN = await this.serviceController.modifyName(id, name)
            const ND = await this.serviceController.modifyDurationMinutes(id, Number(durationMinutes))
            const NP = await this.serviceController.modifyPrice(id, Number(price))
            if (NN.success && ND.success && NP.success) {
                res.status(200).json({success: true})
            } else {
                res.status(400).json({success: false})
            }
        } catch {
            res.status(500).json({success: false, message: "Failed to modify service"})
        }
     }

     async getAll(req: Request, res: Response) {
        try {
            const result = await this.serviceController.getAll()
            res.status(200).json(result)
        } catch {
            res.status(500).json({success: false, message: "Failed to fetch services"})
        }
     }
}
