import { GuestService } from "../services/guestService.js";
import type { Request, Response } from "express";

export class GuestController {

    private guestController : GuestService

    constructor(guestController : GuestService) {
        this.guestController = guestController
    }

    add(req: Request, res: Response) {
        const {name, phone, gender} = req.body
        const result = this.guestController.add(name, phone, gender)
        res.status(201).json(result)
    }

    getByID(req: Request, res: Response) {
        const id = req.params['id'] as string
        const result = this.guestController.getByID(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }
}