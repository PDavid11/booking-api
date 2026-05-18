import { ServiceService } from "../services/serviceService.js";
import type { Request, Response } from "express";

export class ServiceController {

     private serviceController : ServiceService

     constructor(serviceController : ServiceService) {
        this.serviceController = serviceController
     }

     add(req: Request, res: Response) {
        const {name, durationMinutes, price} = req.body
        const result = this.serviceController.add(name, durationMinutes, price)
        res.status(201).json(result)
     }

     delete(req: Request, res: Response) {
        const {id} = req.body
        const result = this.serviceController.delete(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
     }

     modify(req: Request, res: Response) {
        const {id, name, durationMinutes, price} = req.body
        const NN = this.serviceController.modifyName(id, name)
        const ND = this.serviceController.modifyDurationMinutes(id, durationMinutes)
        const NP = this.serviceController.modifyPrice(id, price)
        if (NN.success && ND.success && NP.success) {
            res.status(200).json({success: true})
        } else {
            res.status(400).json({success: false})
        }
     }

     getAll(req: Request, res: Response) {
        const result = this.serviceController.getAll()
        res.status(200).json(res)
     }
}