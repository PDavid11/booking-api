import { GuestService } from "../services/guestService.js";
import type { Request, Response } from "express";

export class GuestController {

    private guestController : GuestService

    constructor(guestController : GuestService) {
        this.guestController = guestController
    }

    async add(req: Request, res: Response) {
        const {name, phone} = req.body
        const result = await this.guestController.add(name, phone)
        res.status(201).json(result)
    }

    async getByID(req: Request, res: Response) {
        const id = req.params['id'] as string
        const result = await this.guestController.getByID(id)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }
}
