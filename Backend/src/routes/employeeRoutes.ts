import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { EmployeeService } from "../services/employeeService.js";

const router = Router()
const repo = new EmployeeRepo()
const service = new EmployeeService(repo)
const controller = new EmployeeController(service)

router.post("/",  (req, res) => controller.add(req, res))
router.delete("/", (req, res) => controller.delete(req, res))
router.put("/", (req, res) => controller.modify(req, res))

export default router