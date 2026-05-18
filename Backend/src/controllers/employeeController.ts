import { EmployeeService } from "../services/employeeService.js";
import type { Request, Response } from "express";

export class EmployeeController {

    private employeeController : EmployeeService

    constructor(employeeController : EmployeeService) {
        this.employeeController = employeeController
    }

    add(req: Request, res: Response) {
        const {name, phone, instagram, role} = req.body
        const result = this.employeeController.add(name, phone, instagram, role)
        res.status(201).json(result)
    }

    delete(req: Request, res: Response) {
        const { ID } = req.body
        const result = this.employeeController.delete(ID)
        if (!result.success) {
            res.status(404).json(result.reason)
        } else {
            res.status(200).json(result)
        }
    }

    modify(req: Request, res: Response) {
        const { ID, name, phone, instagram, role } = req.body
        const NN = this.employeeController.modifyName(ID, name)
        const NP = this.employeeController.modifyPhone(ID, phone)
        const NI = this.employeeController.modifyInstagram(ID, instagram)
        const NR = this.employeeController.modifyRole(ID, role)
        if (NN.success && NP.success && NI.success && NR.success) {
            res.status(200).json({success: true})
        } else {
            res.status(400).json({success: false})
        }
    }

    getAll(req: Request, res: Response) {
        const result = this.employeeController.getAll()
        res.status(200).json(result)
    }
}