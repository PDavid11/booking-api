import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController.js";
import { AppointmentService } from "../services/appointmentService.js";
import { AppointmentRepo } from "../repositories/appointmentRepo.js";
import { GuestRepo } from "../repositories/guestRepo.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { ServiceRepo } from "../repositories/serviceRepo.js";
import { GuestService } from "../services/guestService.js";


const router = Router()
const appointmentRepo = new AppointmentRepo()
const guestRepo = new GuestRepo()
const employeeRepo = new EmployeeRepo()
const serviceRepo = new ServiceRepo()
const guestService = new GuestService(guestRepo)
const service = new AppointmentService(guestService, employeeRepo, serviceRepo, appointmentRepo)
const controller = new appointmentController(service)

router.post("/", (req, res) => controller.add(req, res))
router.get("/:id", (req, res) => controller.getByID(req, res))
router.get("/status/:status", (req, res) => controller.getByStatus(req, res))
router.patch("/", (req, res) => controller.modifyStatus(req, res))

export default router